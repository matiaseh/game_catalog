import { Game, GamesData } from '../../types/Game';
import styles from './GroupCards.module.scss';

interface GroupCardProps {
  data: GamesData;
}

const getRandomGames = (gameIds: number[], allGames: Game[]): Game[] => {
  const selectedGames = gameIds
    .map((id) => allGames.find((game) => game.id === id))
    .filter((game): game is Game => game !== undefined);

  const shuffled = selectedGames.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3);
};

interface ThumbnailProps {
  groupName: string;
  gameImages: string[];
}

const Thumbnail = ({ gameImages, groupName }: ThumbnailProps) => {
  const sliceWidth = 33.33;

  return (
    <div className={styles.groupItemContainer}>
      <div className={styles.thumbnailContainer}>
        {gameImages.slice(0, 3).map((image, index) => (
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
        <p>{groupName}</p>
        <div className={styles.groupEditIcons}>
          <div className={`${styles.groupEditIcon} ${styles.add}`}>
            <i className="fa-solid fa-pen" />
            <p>Edit</p>
          </div>
          <div className={`${styles.groupEditIcon} ${styles.delete}`}>
            <i className="fa-solid fa-xmark" />
            <p>Delete</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const GroupCards = ({ data }: GroupCardProps) => {
  return (
    <div className={styles.groupCardsContainer}>
      <div className={styles.groupCard}>
        <div className={styles.titleContainer}>
          <h3 className={styles.groupTitle}>Groups</h3>
          <i className={`${styles.addIcon} fa-solid fa-plus`} />
        </div>
        <div className={styles.groupItemsContainer}>
          {data.groups.map((group) => {
            const randomGames = getRandomGames(group.games, data.games);
            return (
              <Thumbnail
                key={group.id}
                groupName={group.name}
                gameImages={randomGames.map((game) => game.cover)}
              />
            );
          })}
        </div>
      </div>
      <div className={styles.groupCard}>
        <h3 className={styles.groupTitle}>Games</h3>
        <div className={styles.groupItemsContainer}>
          {data.games.map((game) => (
            <div className={styles.groupItemContainer}>
              <div className={styles.thumbnailContainer} key={game.id}>
                <img
                  src={game.cover}
                  alt={game.name}
                  className={styles.coverImage}
                />
              </div>
              <div className={styles.thumbnailFooter}>{game.name}</div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.groupCard}>
        <h3 className={styles.groupTitle}>Providers</h3>
        <div className={styles.groupItemsContainer}>
          {data.providers.map((provider) => (
            <div className={styles.groupItemContainer}>
              <div
                className={`${styles.thumbnailContainer} ${styles.provider}`}
                key={provider.id}
              >
                <img
                  src={`../../src/assets/img/${provider.logo}`}
                  alt={provider.name}
                  className={styles.coverImage}
                />
              </div>
              <div className={styles.thumbnailFooter}>{provider.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GroupCards;
