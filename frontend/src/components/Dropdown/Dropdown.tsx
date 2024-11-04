import { useState } from 'react';
import styles from './Dropdown.module.scss';

interface DropdownOption {
  value: number;
  label: string;
}

interface DropdownProps {
  placeholder: string;
  options: DropdownOption[];
  selectedValue: number | null;
  onSelect: (value: number) => void;
}

const Dropdown = ({
  placeholder,
  options,
  selectedValue,
  onSelect,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (value: number) => {
    onSelect(value);
    setIsOpen(false);
  };

  const selectedOption = options.find(
    (option) => option.value === selectedValue,
  );
  const selectedOptionLabel = selectedOption
    ? selectedOption.label
    : placeholder;

  return (
    <div className={styles.dropdown}>
      <input
        className={styles.dropdownInput}
        type="text"
        readOnly
        value={selectedOptionLabel}
        onClick={toggleDropdown}
        placeholder={placeholder}
      />
      <i
        className={`${styles.dropdownIcon} ${isOpen ? 'fa-solid fa-chevron-up' : 'fa-solid fa-chevron-down'}`}
      />
      {isOpen && (
        <div className={styles.dropdownMenu}>
          {options.map((option) => (
            <div
              key={option.value}
              className={styles.dropdownItem}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
