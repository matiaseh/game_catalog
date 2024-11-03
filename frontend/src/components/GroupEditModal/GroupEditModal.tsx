import { Game, Group } from '../../types/Game';
import styles from './GroupEditModal.module.scss';
import EditModalContent from './ModalContents/EditModalContent';
import DeleteModalContent from './ModalContents/DeleteModalContent';
import { createGroup, updateGroup } from '../../api/api';

interface GroupEditModalProps {
  groups: Group[];
  games: Game[];
  selectedGroup: Group;
  type: 'edit' | 'create' | 'delete';
  onClose: () => void;
}

const GroupEditModal = ({
  groups,
  games,
  selectedGroup,
  type,
  onClose,
}: GroupEditModalProps) => {
  return (
    <>
      <div className={styles.modalBackdrop} onClick={onClose} />
      <div className={styles.modal}>
        <i
          className={`${styles.closeIcon} fa-solid fa-xmark`}
          onClick={onClose}
        />
        <div className={styles.modalContent}>
          <h2>{`Group ${type}`}</h2>
          {type === 'edit' ? (
            <EditModalContent
              type={type}
              selectedGroup={selectedGroup}
              games={games}
              onClose={onClose}
              onSubmit={async (updatedGroup) =>
                await updateGroup(selectedGroup.id, updatedGroup)
              }
            />
          ) : type === 'create' ? (
            <EditModalContent
              type={type}
              selectedGroup={selectedGroup}
              games={games}
              onClose={onClose}
              onSubmit={async (newGroup) => await createGroup(newGroup)}
            />
          ) : (
            <DeleteModalContent
              selectedGroup={selectedGroup}
              groups={groups}
              onClose={onClose}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default GroupEditModal;
