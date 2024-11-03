import { useState } from 'react';
import styles from './Dropdown.module.scss';

interface DropdownOption {
  value: number;
  label: string;
}

interface DropdownProps {
  options: DropdownOption[];
  selectedValue: number | null;
  onSelect: (value: number) => void;
}

const Dropdown = ({ options, selectedValue, onSelect }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (groupId: number) => {
    onSelect(groupId);
    setIsOpen(false);
  };

  const selectedGroup = options.find(
    (option) => option.value === selectedValue,
  );
  const selectedGroupName = selectedGroup
    ? selectedGroup.label
    : 'Select a group';

  return (
    <div className={styles.dropdown}>
      <input
        className={styles.dropdownInput}
        type="text"
        readOnly
        value={selectedGroupName}
        onClick={toggleDropdown}
        placeholder="Select a group"
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
