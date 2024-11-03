import { useState } from 'react';
import { GamesData, Group } from '../../types/Game';
import GroupCards from '../GroupCards/GroupCards';
import GroupEditModal from '../GroupEditModal/GroupEditModal';
import { QueryObserverResult } from '@tanstack/react-query';

interface GroupViewProps {
  data: GamesData;
  refetch: () => Promise<QueryObserverResult<GamesData, Error>>;
}

const GroupView = ({ data, refetch }: GroupViewProps) => {
  const [selectedGroup, setSelectedGroup] = useState<Group>();
  const [modalType, setModalType] = useState<'edit' | 'create' | 'delete'>();

  const handleCreateClick = () => {
    // use temporary empty group
    setSelectedGroup({ id: 0, name: '', games: [] });
    setModalType('create');
  };

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

    // TODO: Maybe not the best way to refech every time modal is closed but works for now.
    refetch();
  };

  return (
    <>
      <GroupCards
        data={data}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
        onCreateClick={handleCreateClick}
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
