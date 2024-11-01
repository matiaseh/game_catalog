import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import GamesList from '../../components/GamesList/GamesList';
import { Game, GamesData } from '../../types/Game';
import styles from './PlayerView.module.scss';
import NavBar from '../../components/NavBar/NavBar';
import GameFilters from '../../components/GameFilters/GameFilters';
import { useEffect, useState } from 'react';

// Function to check if a game matches the selected providers
const isGameFromSelectedProvider = (game: Game, providers: number[]) => {
  if (providers.length === 0) return true;
  return providers.includes(game.provider);
};

// Function to check if a game matches the search term
const isGameInSearchTerm = (game: Game, searchTerm: string) => {
  return game.name.toLowerCase().includes(searchTerm.toLowerCase());
};

const apiUrl = import.meta.env.VITE_API_URL;

const fetchGamesData = async (): Promise<GamesData> => {
  const { data } = await axios.get(`${apiUrl}/games`);
  return data;
};

const PlayerView = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['games'],
    queryFn: fetchGamesData,
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  const [selectedProviderIds, setSelectedProviderIds] = useState<number[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  const handleProviderSelect = (providerId: number) => {
    setSelectedProviderIds((prev) =>
      prev.includes(providerId)
        ? prev.filter((id) => id !== providerId)
        : [...prev, providerId],
    );
  };

  // Filter games based on selected providers and search term
  const filteredGames =
    data?.games.filter((game) => {
      const matchesProvider = isGameFromSelectedProvider(
        game,
        selectedProviderIds,
      );

      const matchesSearchTerm = isGameInSearchTerm(game, debouncedSearchTerm);
      return matchesProvider && matchesSearchTerm;
    }) || [];

  const renderGamesList = () => {
    if (isLoading) return <div>Loading</div>;
    if (error) return <div>Error loading games</div>;
    if (!filteredGames || filteredGames.length === 0) {
      return <div>No games found</div>;
    }
    return <GamesList games={filteredGames} />;
  };

  return (
    <div className={styles.playerViewContainer}>
      <NavBar />
      <div className={styles.playerViewContent}>
        {renderGamesList()}
        <GameFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          providers={data?.providers}
          selectedProviderIds={selectedProviderIds}
          onProviderSelect={handleProviderSelect}
        />
      </div>
    </div>
  );
};

export default PlayerView;
