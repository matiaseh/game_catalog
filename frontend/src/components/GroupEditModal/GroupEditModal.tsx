import { Game, Group } from '../../types/Game';
import styles from './GroupEditModal.module.scss';
import EditModalContent from './ModalContents/EditModalContent';
import DeleteModalContent from './ModalContents/DeleteModalContent';

interface GroupEditModalProps {
  groups: Group[];
  games: Game[];
  selectedGroup: Group;
  type: 'edit' | 'delete';
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
          <h2>{type === 'edit' ? 'Group editing' : 'Group Delete'}</h2>
          {type === 'edit' ? (
            <EditModalContent
              selectedGroup={selectedGroup}
              games={games}
              onClose={onClose}
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
