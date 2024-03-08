import { ListItemButton, ListItemText } from '@mui/material';
import { recruitment } from 'types/recruit/recruitments';
import { dateToString } from 'utils/handleTime';
import styles from 'styles/recruit/RecruitList/list.module.scss';

const RecruitListItem = ({ recruit }: { recruit: recruitment }) => {
  return (
    <ListItemButton className={styles.list_item}>
      <ListItemText
        primary={recruit.title}
        secondary={
          dateToString(new Date(recruit.startDate)) +
          ' ~ ' +
          dateToString(new Date(recruit.startDate))
        }
      />
    </ListItemButton>
  );
};

export default RecruitListItem;
