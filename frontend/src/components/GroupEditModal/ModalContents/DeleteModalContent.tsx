import { useState } from 'react';
import { deleteGroup, updateGroup } from '../../../api/api';
import { Group } from '../../../types/Game';
import Dropdown from '../../Dropdown/Dropdown';
import styles from './ModalContent.module.scss';
import { useQueryClient } from '@tanstack/react-query';
import Checkbox from '../../Checkbox/Checkbox';

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
  const queryClient = useQueryClient();
  const [targetGroupId, setTargetGroupId] = useState<number | null>(null);
  const [deleteCompletely, setDeleteCompletely] = useState(false);

  const groupOptions = groups.map((group) => ({
    value: group.id,
    label: group.name,
  }));

  const handleDelete = async () => {
    if (!targetGroupId && !deleteCompletely) return;
    try {
      const targetGroup = groups.find((group) => group.id === targetGroupId);

      if (targetGroup) {
        const updatedGames = [...targetGroup.games, ...selectedGroup.games];
        await updateGroup(targetGroup.id, { games: updatedGames });
      }

      await deleteGroup(selectedGroup.id);
      queryClient.invalidateQueries({ queryKey: ['games'] });
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
        <div className={styles.dropDown}>
          <Dropdown
            placeholder="Move games to"
            options={groupOptions.filter(
              (group) => group.value !== selectedGroup.id,
            )}
            selectedValue={targetGroupId}
            onSelect={setTargetGroupId}
          />
          <Checkbox
            label="Delete completely"
            checked={deleteCompletely}
            onChange={(chekced) => setDeleteCompletely(chekced)}
            disabled={!!targetGroupId}
            id="deletion-checkbox"
          />
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
