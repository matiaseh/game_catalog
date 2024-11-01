import { Game } from '../../types/Game';
import styles from './GamesList.module.scss';

interface GamesListProps {
  games: Game[];
}

const GamesList = ({ games }: GamesListProps) => {
  return (
    <div className={styles.gamesList}>
      {games.map((game) => (
        <div className={styles.gameItem} key={game.id}>
          <img src={game.cover} alt={game.name} className={styles.gameImage} />
        </div>
      ))}
    </div>
  );
};

export default GamesList;
