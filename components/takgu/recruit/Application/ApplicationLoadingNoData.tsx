import { useRouter } from 'next/router';
import { Box, Grid, Paper, Button } from '@mui/material';
import styles from 'styles/takgu/recruit/application.module.scss';

interface IApplicationLoadingNoData {
  isLoading: boolean;
}

function ApplicationLoadingNoData(props: IApplicationLoadingNoData) {
  const { isLoading } = props;
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <Box>
      <Grid className={styles.form}>
        <Paper className={styles.titleContainer}>42GG 모집</Paper>
        <Paper className={styles.questionContainer}>
          <div className={styles.backTitle}>{isLoading ? '로딩중...' : ''}</div>
          <Button
            className={styles.backBtn}
            variant='contained'
            onClick={goBack}
          >
            뒤로가기
          </Button>
        </Paper>
      </Grid>
    </Box>
  );
}

export default ApplicationLoadingNoData;
