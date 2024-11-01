import { Group, Provider } from '../../types/Game';
import InputField from '../InputField/InputField';
import styles from './GameFilters.module.scss';

export interface Sort {
  type: string;
  title: string;
}

const sorters: Sort[] = [
  { type: 'asc', title: 'A-Z' },
  { type: 'desc', title: 'Z-A' },
  { type: 'newest', title: 'Newest' },
];

const columnOptions = [2, 3, 4];

interface GameFiltersProps {
  searchTerm: string;
  onSearchChange: (search: string) => void;
  providers?: Provider[];
  selectedProviderIds: number[];
  onProviderSelect: (providerId: number) => void;
  groups?: Group[];
  selectedGroupIds: number[];
  onGroupSelect: (groupId: number) => void;
  selectedSort: string;
  onSortSelect: (sort: string) => void;
  selectedColumns: number;
  onColumnSelect: (option: number) => void;
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
  selectedSort,
  onSortSelect,
  selectedColumns,
  onColumnSelect,
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
      <div className={styles.filtersContainer}>
        <p className={styles.filtersTitle}>Sorting</p>
        <div className={styles.filters}>
          {sorters.map((sort) => (
            <button
              key={sort.type}
              className={`${styles.filter} ${
                selectedSort === sort.type ? styles.selected : ''
              }`}
              onClick={() => onSortSelect(sort.type)}
            >
              {sort.title}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.filtersContainer}>
        <p className={styles.filtersTitle}>Columns</p>
        <div className={styles.filters}>
          {columnOptions.map((option) => (
            <button
              key={option}
              className={`${styles.filter} ${
                selectedColumns === option ? styles.selected : ''
              }`}
              onClick={() => onColumnSelect(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameFilters;
