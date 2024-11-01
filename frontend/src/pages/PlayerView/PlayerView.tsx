import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import GamesList from '../../components/GamesList/GamesList';
import { GamesData } from '../../types/Game';
import styles from './PlayerView.module.scss';
import NavBar from '../../components/NavBar/NavBar';
import GameFilters from '../../components/GameFilters/GameFilters';
import { useEffect, useState } from 'react';

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

  // Set up a delay for the search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  // Filter games based on the search term
  const filteredGames = data?.games.filter((game) =>
    game.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
  );

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
        <GameFilters searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      </div>
    </div>
  );
};

export default PlayerView;
