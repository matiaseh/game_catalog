import { useState } from 'react';
import { MultiValue, CSSObjectWithLabel } from 'react-select';
import Select from 'react-select';
import { updateGroup } from '../../../api/api';
import { Group, Game } from '../../../types/Game';
import InputField from '../../InputField/InputField';
import styles from './ModalContent.module.scss';

interface GroupEditProps {
  selectedGroup: Group;
  games: Game[];
  onClose: () => void;
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
  selectedGroup,
  games,
  onClose,
}: GroupEditProps) => {
  const [input, setInput] = useState(selectedGroup.name);
  const [selectedGameIds, setSelectedGameIds] = useState<number[]>(
    selectedGroup.games,
  );

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
    const updatedGroup = {
      name: input,
      games: selectedGameIds,
    };

    try {
      await updateGroup(selectedGroup.id, updatedGroup);
      onClose();
    } catch (error) {
      console.error('Failed to update group:', error);
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
        />
      </div>
      <div className={styles.modalFooter}>
        <button
          className={`${styles.save} ${input === '' && selectedGameIds.length === 0 ? styles.disabled : styles.enabled}`}
          onClick={handleSave}
          disabled={input === '' && selectedGameIds.length === 0}
        >
          Save
        </button>
      </div>
    </>
  );
};

export default EditModalContent;
