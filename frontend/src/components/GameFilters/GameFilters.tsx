import { Group, Provider } from '../../types/Game';
import ColumnSelector from '../ColumnSlider/ColumnSelector';
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
  gamesAmount: number;
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
  onResetFilters: () => void;
}

const GameFilters = ({
  gamesAmount,
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
  onResetFilters,
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
        <ColumnSelector
          options={columnOptions}
          value={selectedColumns}
          handleChange={(option) => onColumnSelect(option)}
        />
      </div>
      <div className={styles.footerContainer}>
        <p className={styles.filtersTitle}>Games amount {gamesAmount}</p>
        <button className={styles.resetButton} onClick={onResetFilters}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default GameFilters;
