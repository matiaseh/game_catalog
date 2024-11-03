import useIsMobile from '../../hooks/useIsMobile';
import { Game } from '../../types/Game';
import styles from './GamesList.module.scss';

interface GamesListProps {
  games: Game[];
  selectedColumns: number;
}

const GamesList = ({ games, selectedColumns }: GamesListProps) => {
  const isMobile = useIsMobile();
  const columnClass = `columns-${isMobile ? 2 : selectedColumns}`;

  return (
    <div className={`${styles.gamesList} ${styles[columnClass]}`}>
      {games.map((game) => (
        <div className={styles.gameItem} key={game.id}>
          <img src={game.cover} alt={game.name} className={styles.gameImage} />
        </div>
      ))}
    </div>
  );
};

export default GamesList;
