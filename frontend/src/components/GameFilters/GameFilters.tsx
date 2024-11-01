import { Group, Provider } from '../../types/Game';
import InputField from '../InputField/InputField';
import styles from './GameFilters.module.scss';

interface GameFiltersProps {
  searchTerm: string;
  onSearchChange: (search: string) => void;
  providers?: Provider[];
  selectedProviderIds: number[];
  onProviderSelect: (providerId: number) => void;
  groups?: Group[];
  selectedGroupIds: number[];
  onGroupSelect: (groupId: number) => void;
}

const GameFilters = ({
  searchTerm,
  onSearchChange,
  providers,
  selectedProviderIds,
  onProviderSelect,
  groups,
  selectedGroupIds,
  onGroupSelect,
}: GameFiltersProps) => {
  return (
    <div className={styles.gameFilters}>
      <InputField
        type="text"
        placeholder="Search"
        onChange={(e) => onSearchChange(e.target.value)}
        value={searchTerm}
        iconName="fa-solid fa-magnifying-glass"
      />
      <div className={styles.filtersContainer}>
        <p className={styles.filtersTitle}>Providers</p>
        <div className={styles.filters}>
          {providers?.map((provider) => (
            <button
              key={provider.id}
              className={`${styles.filter} ${
                selectedProviderIds.includes(provider.id) ? styles.selected : ''
              }`}
              onClick={() => onProviderSelect(provider.id)}
            >
              {provider.name}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.filtersContainer}>
        <p className={styles.filtersTitle}>Game groups</p>
        <div className={styles.filters}>
          {groups?.map((group) => (
            <button
              key={group.id}
              className={`${styles.filter} ${
                selectedGroupIds.includes(group.id) ? styles.selected : ''
              }`}
              onClick={() => onGroupSelect(group.id)}
            >
              {group.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameFilters;
