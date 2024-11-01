import { Provider } from '../../types/Game';
import InputField from '../InputField/InputField';
import styles from './GameFilters.module.scss';

interface GameFiltersProps {
  searchTerm: string;
  onSearchChange: (search: string) => void;
  providers?: Provider[];
  selectedProviderIds: number[];
  onProviderSelect: (providerId: number) => void;
}

const GameFilters = ({
  searchTerm,
  onSearchChange,
  providers,
  selectedProviderIds,
  onProviderSelect,
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
      <div className={styles.providersContainer}>
        <p className={styles.providersTitle}>Providers</p>
        <div className={styles.providers}>
          {providers?.map((provider) => (
            <button
              key={provider.id}
              className={`${styles.providerButton} ${
                selectedProviderIds.includes(provider.id) ? styles.selected : ''
              }`}
              onClick={() => onProviderSelect(provider.id)}
            >
              {provider.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameFilters;
