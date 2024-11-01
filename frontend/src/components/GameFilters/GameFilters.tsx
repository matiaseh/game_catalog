import InputField from '../InputField/InputField';
import styles from './GameFilters.module.scss';

interface GameFiltersProps {
  searchTerm: string;
  onSearchChange: (search: string) => void;
}
const GameFilters = ({ searchTerm, onSearchChange }: GameFiltersProps) => {
  return (
    <div className={styles.gameFilters}>
      <InputField
        type="text"
        placeholder="Search"
        onChange={(e) => onSearchChange(e.target.value)}
        value={searchTerm}
        iconName="fa-solid fa-magnifying-glass"
      />
    </div>
  );
};

export default GameFilters;
