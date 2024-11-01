import { Group, Provider } from '../../types/Game';
import { Sort } from '../GameFilters/GameFilters';
import styles from './FilterSelector.module.scss';

interface FilterSelectorProps {
  title: 'Providers' | 'Groups' | 'Sorting';
  options?: Group[] | Provider[] | Sort[];
  selectedOptions?: number[];
  selectedOption?: number;
  onOptionSelect: (option: number) => void;
}

const FilterSelector = ({
  title,
  options,
  selectedOptions,
  selectedOption,
  onOptionSelect,
}: FilterSelectorProps) => {
  const isSingleSelect = title === 'Sorting';

  return (
    <div className={styles.filtersContainer}>
      <p className={styles.filtersTitle}>{title}</p>
      <div className={styles.filters}>
        <div className={styles.filters}>
          {options?.map((option) => (
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

export default FilterSelector;
