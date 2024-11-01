import { Group, Provider } from '../../types/Game';
import ColumnSelector from '../ColumnSlider/ColumnSelector';
import FilterSelector from '../FilterSelector/FilterSelector';
import InputField from '../InputField/InputField';
import styles from './GameFilters.module.scss';

export interface Sort {
  id: number;
  type: string;
  name: string;
}

const sorters: Sort[] = [
  { id: 1, type: 'asc', name: 'A-Z' },
  { id: 2, type: 'desc', name: 'Z-A' },
  { id: 3, type: 'newest', name: 'Newest' },
];

const columnOptions = [2, 3, 4];

interface GameFiltersProps {
  gamesAmount: number;
  searchTerm: string;
  onSearchChange: (search: string) => void;
  selectedProviderIds: number[];
  onProviderSelect: (providerId: number) => void;
  selectedGroupIds: number[];
  onGroupSelect: (groupId: number) => void;
  selectedSortId: number | undefined;
  onSortSelect: (sort: number) => void;
  selectedColumns: number;
  onColumnSelect: (option: number) => void;
  onResetFilters: () => void;
  providers?: Provider[];
  groups?: Group[];
}

const GameFilters = ({
  gamesAmount,
  searchTerm,
  onSearchChange,
  selectedProviderIds,
  onProviderSelect,
  selectedGroupIds,
  onGroupSelect,
  selectedSortId,
  onSortSelect,
  selectedColumns,
  onColumnSelect,
  onResetFilters,
  providers,
  groups,
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
      <FilterSelector
        title="Providers"
        options={providers}
        selectedOptions={selectedProviderIds}
        onOptionSelect={onProviderSelect}
      />
      <FilterSelector
        title="Groups"
        options={groups}
        selectedOptions={selectedGroupIds}
        onOptionSelect={onGroupSelect}
      />
      <FilterSelector
        title="Sorting"
        options={sorters}
        selectedOption={selectedSortId}
        onOptionSelect={onSortSelect}
      />
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
