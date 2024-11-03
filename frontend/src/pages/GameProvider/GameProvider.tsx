import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { GamesData } from '../../types/Game';
import styles from './GameProvider.module.scss';
import NavBar from '../../components/NavBar/NavBar';
import { Route, Routes } from 'react-router-dom';
import GroupView from '../../components/GroupView/GroupView';
import PlayerView from '../../components/GamesView/GamesView';

const apiUrl = import.meta.env.VITE_API_URL;

const fetchGamesData = async (): Promise<GamesData> => {
  const { data } = await axios.get(`${apiUrl}/games`);
  return data;
};

const GameProvider = () => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['games'],
    queryFn: fetchGamesData,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading games</div>;
  if (!data || data.games.length === 0) {
    return <div>No games found</div>;
  }

  return (
    <div className={styles.playerViewContainer}>
      <NavBar />
      <Routes>
        <Route path="/" element={<PlayerView data={data} />} />
        <Route
          path="/groups"
          element={<GroupView data={data} refetch={refetch} />}
        />
      </Routes>
    </div>
  );
};

export default GameProvider;
