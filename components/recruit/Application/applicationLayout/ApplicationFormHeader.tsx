import { useRouter } from 'next/router';
import { HomeOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';
import styles from 'styles/recruit/application.module.scss';

interface IApplicationFormHeaderProps {
  title: string;
}

const ApplicationFormHeader = (props: IApplicationFormHeaderProps) => {
  const { title } = props;
  const router = useRouter();

  const goRecruitHome = () => {
    router.push('/recruit');
  };

  return (
    <div className={styles.stickyHeader}>
      <div className={styles.stickyContainer}>
        <span className={styles.pageTitle}>{title}</span>
        <Button
          className={styles.homeBtn}
          variant='text'
          startIcon={<HomeOutlined />}
          onClick={() => goRecruitHome()}
        >
          모집 메인
        </Button>
      </div>
    </div>
  );
};

export default ApplicationFormHeader;
