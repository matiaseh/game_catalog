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

const Thumbnail = ({ gameImages }: ThumbnailProps) => {
  const sliceWidth = 33.33;

  return (
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
  );
};

const GroupCards = ({ data }: GroupCardProps) => {
  return (
    <div className={styles.groupCardsContainer}>
      <div className={styles.groupCardContainer}>
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
      <div className={styles.groupCardContainer}>
        <h3 className={styles.groupTitle}>Games</h3>
        <div className={styles.groupItemsContainer}>
          {data.games.map((game) => (
            <div className={styles.thumbnailContainer} key={game.id}>
              <img
                src={game.cover}
                alt={game.name}
                className={styles.coverImage}
              />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.groupCardContainer}>
        <h3 className={styles.groupTitle}>Providers</h3>
        <div className={styles.groupItemsContainer}>
          {data.providers.map((provider) => {
            return (
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
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GroupCards;
