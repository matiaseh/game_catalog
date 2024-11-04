import { Game } from '../../types/Game';
import styles from './GamesList.module.scss';

interface GamesListProps {
  games: Game[];
  selectedColumns: number;
}

const GamesList = ({ games, selectedColumns }: GamesListProps) => {
  const columnClass = `columns-${selectedColumns}`;

  return (
    <>
      {games.length <= 0 ? (
        <div className={styles.emptyList}>
          <h2>No games found</h2>
        </div>
      ) : (
        <div className={`${styles.gamesList} ${styles[columnClass]}`}>
          {games.map((game) => (
            <div className={styles.gameItem} key={game.id}>
              <img
                src={game.cover}
                alt={game.name}
                className={styles.gameImage}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default GamesList;
