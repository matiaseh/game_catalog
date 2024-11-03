import { Game, Group, Provider } from '../../types/Game';
import EditableGroupItem from './EditableGroupItem';
import styles from './GroupCards.module.scss';

interface GroupCardProps {
  title: 'Groups' | 'Games' | 'Providers';
  groups?: Group[];
  games?: Game[];
  allGames?: Game[];
  providers?: Provider[];
  onEditClick: (group: Group) => void;
  onDeleteClick: (group: Group) => void;
  onCreateClick?: () => void;
}

const GroupCard = ({
  title,
  groups,
  games,
  providers,
  allGames,
  onEditClick,
  onDeleteClick,
  onCreateClick,
}: GroupCardProps) => {
  return (
    <>
      {groups && (
        <div className={styles.groupCard}>
          <div className={styles.titleContainer}>
            <h3 className={styles.groupTitle}>{title}</h3>
            {onCreateClick && (
              <i
                className={`${styles.addIcon} fa-solid fa-plus`}
                onClick={onCreateClick}
              />
            )}
          </div>
          <div className={styles.groupItemsContainer}>
            {groups.map((group) => {
              return (
                <EditableGroupItem
                  key={group.id}
                  group={group}
                  allGames={allGames ?? []}
                  onEditClick={onEditClick}
                  onDeleteClick={onDeleteClick}
                />
              );
            })}
          </div>
        </div>
      )}
      {games && (
        <div className={styles.groupCard}>
          <div className={styles.titleContainer}>
            <h3 className={styles.groupTitle}>{title}</h3>
          </div>
          <div className={styles.groupItemsContainer}>
            {games.map((game) => (
              <div className={styles.groupItemContainer} key={game.id}>
                <div className={styles.thumbnailContainer}>
                  <img
                    src={game.cover}
                    alt={game.name}
                    className={styles.coverImage}
                  />
                </div>
                <div className={styles.thumbnailFooter}>
                  <p>{game.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {providers && (
        <div className={styles.groupCard}>
          <div className={styles.titleContainer}>
            <h3 className={styles.groupTitle}>{title}</h3>
          </div>
          <div className={styles.groupItemsContainer}>
            {providers.map((provider) => (
              <div className={styles.groupItemContainer} key={provider.id}>
                <div
                  className={`${styles.thumbnailContainer} ${styles.provider}`}
                >
                  <img
                    src={`../../src/assets/img/${provider.logo}`}
                    alt={provider.name}
                    className={styles.coverImage}
                  />
                </div>
                <div className={styles.thumbnailFooter}>
                  <p>{provider.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default GroupCard;
