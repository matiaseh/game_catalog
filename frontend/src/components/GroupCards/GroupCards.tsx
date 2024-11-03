import { GamesData, Group } from '../../types/Game';
import GroupCard from './GroupCard';
import styles from './GroupCards.module.scss';

interface GroupCardProps {
  data: GamesData;
  onEditClick: (group: Group) => void;
  onDeleteClick: (group: Group) => void;
}

const GroupCards = ({ data, onEditClick, onDeleteClick }: GroupCardProps) => {
  return (
    <div className={styles.groupCardsContainer}>
      <GroupCard
        title="Groups"
        groups={data.groups}
        allGames={data.games}
        onEditClick={onEditClick}
        onDeleteClick={onDeleteClick}
      />
      <GroupCard
        title="Games"
        games={data.games}
        onEditClick={onEditClick}
        onDeleteClick={onDeleteClick}
      />
      <GroupCard
        title="Providers"
        providers={data.providers}
        onEditClick={onEditClick}
        onDeleteClick={onDeleteClick}
      />
    </div>
  );
};

export default GroupCards;
