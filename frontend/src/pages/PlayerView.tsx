import { useAuth } from '../context/AuthContext';

const PlayerView = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <h1>Player View</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default PlayerView;
