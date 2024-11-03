import { Game, Group } from '../../types/Game';
import styles from './GroupCards.module.scss';

interface EditableGroupItemProps {
  group: Group;
  allGames: Game[];
  onEditClick: (group: Group) => void;
  onDeleteClick: (group: Group) => void;
}

const getGamesForThumbnail = (gameIds: number[], allGames: Game[]): Game[] => {
  const sliceEnd = gameIds.length >= 3 ? 3 : gameIds.length;
  return gameIds
    .slice(0, sliceEnd)
    .map((id) => allGames.find((game) => game.id === id))
    .filter((game): game is Game => game !== undefined);
};

const getSliceWidth = (imagesAmount: number) => {
  switch (imagesAmount) {
    case 1:
      return 100;
    case 2:
      return 50;
    case 3:
      return 33.33;
    default:
      return 100;
  }
};

const getBackgroundSize = (imagesAmount: number) => {
  switch (imagesAmount) {
    case 1:
      return '100% 100%';
    case 2:
      return '200% 100%';
    case 3:
      return '300% 100%';
    default:
      return '100% 100%';
  }
};

const EditableGroupItem = ({
  group,
  allGames,
  onEditClick,
  onDeleteClick,
}: EditableGroupItemProps) => {
  const gameImagesForCover = getGamesForThumbnail(group.games, allGames).map(
    (game) => game.cover,
  );

  const sliceWidth = getSliceWidth(gameImagesForCover.length);
  const backgroundSize = getBackgroundSize(gameImagesForCover.length);

  return (
    <div className={styles.groupItemContainer}>
      <div className={styles.thumbnailContainer}>
        {gameImagesForCover.slice(0, 3).map((image, index) => (
          <div
            key={index}
            className={styles.thumbnailSlice}
            style={{
              backgroundImage: `url(${image})`,
              backgroundPosition: `${sliceWidth * index}% 0`,
              backgroundSize: backgroundSize,
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
