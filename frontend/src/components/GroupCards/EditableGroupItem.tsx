import { Game, Group } from '../../types/Game';
import styles from './GroupCards.module.scss';

interface EditableGroupItemProps {
  group: Group;
  allGames: Game[];
  onEditClick: (group: Group) => void;
  onDeleteClick: (group: Group) => void;
}

const getFirstThreeGames = (gameIds: number[], allGames: Game[]): Game[] => {
  return gameIds
    .slice(0, 3)
    .map((id) => allGames.find((game) => game.id === id))
    .filter((game): game is Game => game !== undefined);
};

const EditableGroupItem = ({
  group,
  allGames,
  onEditClick,
  onDeleteClick,
}: EditableGroupItemProps) => {
  const sliceWidth = 33.33;
  const gameImagesForCover = getFirstThreeGames(group.games, allGames).map(
    (game) => game.cover,
  );
  return (
    <div className={styles.groupItemContainer}>
      <div className={styles.thumbnailContainer}>
        {gameImagesForCover.slice(0, 3).map((image, index) => (
          <div
            key={index}
            className={styles.thumbnailSlice}
            style={{
              backgroundImage: `url(${image || 'path/to/default.jpg'})`,
              backgroundPosition: `${sliceWidth * index}% 0`,
              width: `${sliceWidth}%`,
            }}
          />
        ))}
      </div>
      <div className={styles.thumbnailFooter}>
        <p>{group.name}</p>
        <div className={styles.groupEditIcons}>
          <div
            className={`${styles.groupEditIcon} ${styles.add}`}
            onClick={() => onEditClick(group)}
          >
            <i className="fa-solid fa-pen" />
            <p>Edit</p>
          </div>
          <div
            className={`${styles.groupEditIcon} ${styles.delete}`}
            onClick={() => onDeleteClick(group)}
          >
            <i className="fa-solid fa-xmark" />
            <p>Delete</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditableGroupItem;
