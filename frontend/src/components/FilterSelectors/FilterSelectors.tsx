import { Group, Provider } from '../../types/Game';
import SliderSelector from '../ColumnSelector/SliderSelector';
import { Sort } from '../GameFilters/GameFilters';
import styles from './FilterSelectors.module.scss';

interface FilterSelectorProps {
  title: 'Providers' | 'Game groups' | 'Sorting';
  options: Group[] | Provider[] | Sort[];
  selectedOptions?: number[];
  selectedOption?: number;
  onOptionSelect: (option: number) => void;
}

export const FilterSelector = ({
  title,
  options,
  selectedOptions,
  selectedOption,
  onOptionSelect,
}: FilterSelectorProps) => {
  const isSingleSelect = title === 'Sorting';

  return (
    <div className={styles.filterContainer}>
      <p className={styles.filterTitle}>{title}</p>
      <div className={styles.filters}>
        <div className={styles.filters}>
          {options.map((option) => (
            <button
              key={option.id}
              className={`${styles.filter} ${
                isSingleSelect
                  ? selectedOption === option.id
                    ? styles.selected
                    : ''
                  : selectedOptions?.includes(option.id)
                    ? styles.selected
                    : ''
              }`}
              onClick={() => onOptionSelect(option.id)}
            >
              {option.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const columnOptions = [2, 3, 4];

interface ColumnSelectorProps {
  selectedColumns: number;
  onColumnSelect: (option: number) => void;
}

export const ColumnSelector = ({
  selectedColumns,
  onColumnSelect,
}: ColumnSelectorProps) => {
  return (
    <div className={`${styles.filterContainer} ${styles.columnSelector}`}>
      <p className={styles.filterTitle}>Columns</p>
      <SliderSelector
        options={columnOptions}
        value={selectedColumns}
        handleChange={(option) => onColumnSelect(option)}
      />
    </div>
  );
};

interface FiltersFooterProps {
  itemsAmount: number;
  onResetClick: () => void;
}

export const FiltersFooter = ({
  itemsAmount,
  onResetClick,
}: FiltersFooterProps) => {
  return (
    <div className={styles.itemsAmount}>
      <p className={styles.filterTitle}>Games amount {itemsAmount}</p>
      <button className={styles.resetButton} onClick={onResetClick}>
        Reset
      </button>
    </div>
  );
};
