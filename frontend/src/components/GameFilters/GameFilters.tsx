import { useState } from 'react';
import { Group, Provider } from '../../types/Game';
import ColumnSelector from '../ColumnSlider/ColumnSelector';
import FilterSelector from '../FilterSelector/FilterSelector';
import InputField from '../InputField/InputField';
import styles from './GameFilters.module.scss';
import filterStyles from '../FilterSelector/FilterSelector.module.scss';
import useIsMobile from '../../hooks/useIsMobile';

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
  const isMobile = useIsMobile();

  const renderSearchInput = () => {
    return (
      <InputField
        type="text"
        placeholder="Search"
        onChange={(e) => onSearchChange(e.target.value)}
        value={searchTerm}
        iconName="fa-solid fa-magnifying-glass"
      />
    );
  };

  const renderFilters = () => {
    return (
      <div
        className={`${styles.gameFilters} ${isMobile ? '' : styles.gameFiltersDesktop}`}
      >
        {!isMobile && renderSearchInput()}
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
        {!isMobile && (
          <div className={filterStyles.filtersContainer}>
            <p className={filterStyles.filtersTitle}>Columns</p>
            <ColumnSelector
              options={columnOptions}
              value={selectedColumns}
              handleChange={(option) => onColumnSelect(option)}
            />
          </div>
        )}
        <div className={styles.footerContainer}>
          <p className={filterStyles.filtersTitle}>
            Games amount {gamesAmount}
          </p>
          <button className={styles.resetButton} onClick={onResetFilters}>
            Reset
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      {isMobile ? (
        <div className={styles.mobileFilterContainer}>
          <div className={styles.mobileFilterContent}>
            {renderSearchInput()}
            {isDrawerOpen && renderFilters()}
            <button
              className={styles.drawerToggleButton}
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            >
              <i className="fa-solid fa-bars" />
              {isDrawerOpen ? 'Close Filters' : 'Open Filters'}
            </button>
          </div>
        </div>
      ) : (
        renderFilters()
      )}
    </>
  );
};

export default GameFilters;
