import { GamesData } from '../../types/Game';
import GroupCards from '../GroupCard/GroupCards';

interface GroupViewProps {
  data: GamesData;
}

const GroupView = ({ data }: GroupViewProps) => {
  return <GroupCards data={data} />;
};

export default GroupView;
