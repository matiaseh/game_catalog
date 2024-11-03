import { useState } from 'react';
import { GamesData, Group } from '../../types/Game';
import GroupCards from '../GroupCards/GroupCards';
import GroupEditModal from '../GroupEditModal/GroupEditModal';

interface GroupViewProps {
  data: GamesData;
}

const GroupView = ({ data }: GroupViewProps) => {
  const [selectedGroup, setSelectedGroup] = useState<Group>();
  const [modalType, setModalType] = useState<'edit' | 'delete'>();

  const handleEditClick = (group: Group) => {
    setSelectedGroup(group);
    setModalType('edit');
  };

  const handleDeleteClick = (group: Group) => {
    setSelectedGroup(group);
    setModalType('delete');
  };

  const closeModal = () => {
    setSelectedGroup(undefined);
    setModalType(undefined);
  };

  return (
    <>
      <GroupCards
        data={data}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
      />
      {selectedGroup && modalType && (
        <GroupEditModal
          groups={data.groups}
          games={data.games}
          selectedGroup={selectedGroup}
          type={modalType}
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default GroupView;
