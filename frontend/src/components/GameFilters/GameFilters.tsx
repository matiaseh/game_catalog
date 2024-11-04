import { useState } from 'react';
import { Group, Provider } from '../../types/Game';
import InputField from '../InputField/InputField';
import styles from './GameFilters.module.scss';
import {
  ColumnSelector,
  FilterSelector,
  FiltersFooter,
} from '../Filters/FilterSelectors';

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

interface GameFiltersProps {
  providers: Provider[];
  groups: Group[];
  gamesAmount: number;
  searchTerm: string;
  selectedProviderIds: number[];
  selectedGroupIds: number[];
  selectedSortId: number;
  selectedColumns: number;
  onSearchChange: (search: string) => void;
  onProviderSelect: (providerId: number) => void;
  onGroupSelect: (groupId: number) => void;
  onSortSelect: (sort: number) => void;
  onColumnSelect: (option: number) => void;
  onResetFilters: () => void;
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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const renderFilterSelectors = (isOpen: boolean) => {
    return (
      <div
        className={`${styles.scrollableContent} ${isOpen ? styles.show : styles.hide}`}
      >
        <FilterSelector
          title="Providers"
          options={providers}
          selectedOptions={selectedProviderIds}
          onOptionSelect={onProviderSelect}
        />
        <FilterSelector
          title="Game groups"
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
        <ColumnSelector
          selectedColumns={selectedColumns}
          onColumnSelect={onColumnSelect}
        />
        <FiltersFooter
          itemsAmount={gamesAmount}
          onResetClick={onResetFilters}
        />
      </div>
    );
  };

  return (
    <div className={styles.gameFilters}>
      <InputField
        type="text"
        placeholder="Search"
        onChange={(e) => onSearchChange(e.target.value)}
        value={searchTerm}
        iconName="fa-solid fa-magnifying-glass"
      />
      {renderFilterSelectors(isDrawerOpen)}
      <button
        className={styles.drawerToggleButton}
        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
      >
        <i className="fa-solid fa-bars" />
        {isDrawerOpen ? 'Close Filters' : 'Open Filters'}
      </button>
    </div>
  );
};

export default GameFilters;
