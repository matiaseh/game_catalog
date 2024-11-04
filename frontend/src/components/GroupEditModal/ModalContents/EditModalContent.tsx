import { useState } from 'react';
import { MultiValue, CSSObjectWithLabel } from 'react-select';
import Select from 'react-select';
import { Group, Game } from '../../../types/Game';
import InputField from '../../InputField/InputField';
import styles from './ModalContent.module.scss';

interface GroupEditProps {
  type: 'edit' | 'create';
  selectedGroup?: Group;
  games: Game[];
  onClose: () => void;
  onSubmit: (group: { name: string; games: number[] }) => Promise<void>;
}

interface SelectOption {
  value: number;
  label: string;
}

const customSelectStyles = {
  multiValue: (base: CSSObjectWithLabel) => ({
    ...base,
    backgroundColor: '#FDBC11',
  }),
  multiValueLabel: (base: CSSObjectWithLabel) => ({
    ...base,
    color: '#2b2b2b',
  }),
  multiValueRemove: (base: CSSObjectWithLabel) => ({
    ...base,
    color: '#2b2b2b',
    ':hover': {
      backgroundColor: '#e1c200',
      color: '#2b2b2b',
    },
  }),
};

const EditModalContent = ({
  type,
  selectedGroup,
  games,
  onClose,
  onSubmit,
}: GroupEditProps) => {
  const [input, setInput] = useState(selectedGroup?.name || '');
  const [selectedGameIds, setSelectedGameIds] = useState<number[]>(
    selectedGroup?.games || [],
  );

  const isFormValid = input !== '' && selectedGameIds.length > 0;

  const selectOptions: SelectOption[] = games.map((game) => ({
    value: game.id,
    label: game.name,
  }));

  const handleSelectChange = (
    selectedOptions: MultiValue<SelectOption> | null,
  ) => {
    const ids = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    setSelectedGameIds(ids);
  };

  const handleSave = async () => {
    const groupData = {
      name: input,
      games: selectedGameIds,
    };
    if (!isFormValid) return;
    try {
      await onSubmit(groupData);
      onClose();
    } catch (error) {
      console.error(`Failed to ${type} group:`, error);
    }
  };

  return (
    <>
      <div className={styles.modalBody}>
        <InputField
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Group name"
        />
        <Select
          options={selectOptions}
          isMulti
          onChange={handleSelectChange}
          value={selectOptions.filter((option) =>
            selectedGameIds.includes(option.value),
          )}
          styles={customSelectStyles}
          menuShouldScrollIntoView={true}
        />
      </div>
      <div className={styles.modalFooter}>
        <button
          className={`${styles.save} ${!isFormValid ? styles.disabled : styles.enabled}`}
          onClick={handleSave}
          disabled={!isFormValid}
        >
          Save
        </button>
      </div>
    </>
  );
};

export default EditModalContent;
