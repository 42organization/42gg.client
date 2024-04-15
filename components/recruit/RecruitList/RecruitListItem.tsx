import { useRouter } from 'next/router';
import { ListItemButton, ListItemText } from '@mui/material';
import { recruitment } from 'types/recruit/recruitments';
import { dateToString } from 'utils/handleTime';
import styles from 'styles/recruit/RecruitList/list.module.scss';

const RecruitListItem = ({ recruit }: { recruit: recruitment }) => {
  const router = useRouter();
  return (
    <ListItemButton
      onClick={() => router.push(`/recruit/detail/?recruitId=${recruit.id}`)}
      className={styles.listItem}
    >
      <ListItemText
        className={styles.listItemText}
        primary={recruit.title}
        primaryTypographyProps={{
          className: styles.listItemTextPrimary,
        }}
        secondary={
          dateToString(new Date(recruit.startDate)) +
          ' ~ ' +
          dateToString(new Date(recruit.endDate))
        }
      />
    </ListItemButton>
  );
};

export default RecruitListItem;
