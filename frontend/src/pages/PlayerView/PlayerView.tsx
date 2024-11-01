import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import GamesList from '../../components/GamesList/GamesList';
import { Game, GamesData, Group } from '../../types/Game';
import styles from './PlayerView.module.scss';
import NavBar from '../../components/NavBar/NavBar';
import GameFilters from '../../components/GameFilters/GameFilters';
import { useEffect, useState } from 'react';

// Check if a game matches the selected providers
const isGameFromSelectedProvider = (game: Game, providerIds: number[]) => {
  if (providerIds.length === 0) return true;
  return providerIds.includes(game.provider);
};

// Check if a game ID is part of the selected groups
const isGameFromSelectedGroup = (
  gameId: number,
  groupIds: number[],
  groups: Group[],
) => {
  if (groupIds.length === 0) return true;
  return groupIds.some((groupId) => {
    const group = groups.find((g) => g.id === groupId);
    return group && group.games.includes(gameId);
  });
};

// Check if a game matches the search term
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
  const [selectedGroupIds, setSelectedGroupIds] = useState<number[]>([]);

  const [selectedSortId, setSelectedSortId] = useState<number>();
  const [selectedColumns, setSelectedColumns] = useState(3);

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

  const handleGroupSelect = (groupId: number) => {
    setSelectedGroupIds((prev) =>
      prev.includes(groupId)
        ? prev.filter((id) => id !== groupId)
        : [...prev, groupId],
    );
  };

  const handleColumnSelect = (columns: number) => {
    setSelectedColumns(columns);
  };

  const handleResetFilters = () => {
    setSelectedProviderIds([]);
    setSelectedGroupIds([]);
    setSelectedColumns(3);
    setSelectedSortId(undefined);
  };

  const handleSortSelect = (sortId: number) => {
    if (sortId === selectedSortId) {
      setSelectedSortId(undefined);
    } else {
      setSelectedSortId(sortId);
    }
  };

  const sortGames = (games: Game[], sortType?: number) => {
    switch (sortType) {
      case 1:
        return [...games].sort((a, b) => a.name.localeCompare(b.name));
      case 2:
        return [...games].sort((a, b) => b.name.localeCompare(a.name));
      case 3:
        return [...games].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );

      default:
        return games;
    }
  };

  // Filter games based on selected providers, groups and search term
  const filteredGames =
    data?.games.filter((game) => {
      const matchesProvider = isGameFromSelectedProvider(
        game,
        selectedProviderIds,
      );

      const matchesGroup = isGameFromSelectedGroup(
        game.id,
        selectedGroupIds,
        data.groups,
      );

      const matchesSearchTerm = isGameInSearchTerm(game, debouncedSearchTerm);

      return matchesProvider && matchesGroup && matchesSearchTerm;
    }) || [];

  const gamesToDisplay = sortGames(filteredGames, selectedSortId);

  const renderGamesList = () => {
    if (isLoading) return <div>Loading</div>;
    if (error) return <div>Error loading games</div>;
    if (!gamesToDisplay || gamesToDisplay.length === 0) {
      return <div>No games found</div>;
    }
    return (
      <GamesList games={gamesToDisplay} selectedColumns={selectedColumns} />
    );
  };

  return (
    <div className={styles.playerViewContainer}>
      <NavBar />
      <div className={styles.playerViewContent}>
        {renderGamesList()}
        <GameFilters
          gamesAmount={gamesToDisplay.length}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          providers={data?.providers}
          selectedProviderIds={selectedProviderIds}
          onProviderSelect={handleProviderSelect}
          groups={data?.groups}
          selectedGroupIds={selectedGroupIds}
          onGroupSelect={handleGroupSelect}
          selectedSortId={selectedSortId}
          onSortSelect={handleSortSelect}
          selectedColumns={selectedColumns}
          onColumnSelect={handleColumnSelect}
          onResetFilters={handleResetFilters}
        />
      </div>
    </div>
  );
};

export default PlayerView;
