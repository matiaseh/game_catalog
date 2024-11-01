import { Game } from '../../types/Game';
import styles from './GamesList.module.scss';

interface GamesListProps {
  games: Game[];
}

const GamesList = ({ games }: GamesListProps) => {
  return (
    <div className={styles.grid}>
      {games.map((game) => (
        <div key={game.id} className={styles.card}>
          <img src={game.cover} alt={game.name} className={styles.image} />
        </div>
      ))}
    </div>
  );
};

export default GamesList;
