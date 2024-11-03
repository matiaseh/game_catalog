import { useState } from 'react';
import { updateGroup, deleteGroup } from '../../../api/api';
import { Group } from '../../../types/Game';
import Dropdown from '../../Dropdown/Dropdown';
import styles from './ModalContent.module.scss';

interface DeleteModalProps {
  selectedGroup: Group;
  groups: Group[];
  onClose: () => void;
}

const DeleteModalContent = ({
  selectedGroup,
  groups,
  onClose,
}: DeleteModalProps) => {
  const [targetGroupId, setTargetGroupId] = useState<number | null>(null);
  const [deleteCompletely, setDeleteCompletely] = useState(false);

  const groupOptions = groups.map((group) => ({
    value: group.id,
    label: group.name,
  }));

  const handleDelete = async () => {
    if (!targetGroupId && !deleteCompletely) return;
    try {
      if (targetGroupId) {
        const targetGroupGames =
          groups.find((group) => group.id === targetGroupId)?.games ?? [];

        const updatedGames = [...targetGroupGames, ...selectedGroup.games];
        await updateGroup(targetGroupId, { games: updatedGames });
      }

      await deleteGroup(selectedGroup.id);
      onClose();
    } catch (error) {
      console.error('Failed to update group:', error);
    }
  };

  return (
    <>
      <div className={styles.modalBody}>
        <p>
          {`Do you want to delete ${selectedGroup.name} group? If you want to move ${selectedGroup.games.length} games,select new group below.`}
        </p>
        <div>
          <Dropdown
            options={groupOptions.filter(
              (group) => group.value !== selectedGroup.id,
            )}
            selectedValue={targetGroupId}
            onSelect={setTargetGroupId}
          />
          <label className={styles.checkboxContainer}>
            <input
              type="checkbox"
              className={styles.checkboxInput}
              checked={deleteCompletely}
              onChange={() => setDeleteCompletely(!deleteCompletely)}
              disabled={!!targetGroupId}
            />
            <p
              className={`${styles.checkboxLabel} ${!!targetGroupId ? styles.disabled : ''}`}
            >
              Delete completely
            </p>
          </label>
        </div>
      </div>
      <div className={styles.modalFooter}>
        <button
          className={`${styles.delete} ${!targetGroupId && !deleteCompletely ? styles.disabled : styles.enabled}`}
          onClick={handleDelete}
          disabled={!targetGroupId && !deleteCompletely}
        >
          Yes, delete
        </button>

        <button className={styles.cancel} onClick={onClose}>
          No
        </button>
      </div>
    </>
  );
};

export default DeleteModalContent;
