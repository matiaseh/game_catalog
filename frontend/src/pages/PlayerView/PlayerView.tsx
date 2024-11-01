import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import GamesList from '../../components/GamesList/GamesList';
import { GamesData } from '../../types/Game';
import styles from './PlayerView.module.scss';

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
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const renderGamesList = () => {
    if (isLoading) return <div>Loading</div>;
    if (error) return <div>Error loading games</div>;
    if (!data || data.games.length === 0) {
      return <div>No games found</div>;
    }
    return <GamesList games={data.games} />;
  };

  return (
    <div className={styles.playerViewContainer}>
      <h1>Player View</h1>
      <button onClick={handleLogout}>Logout</button>
      {renderGamesList()}
    </div>
  );
};

export default PlayerView;
