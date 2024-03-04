import { ThemeProvider, createTheme } from '@mui/material';
// import useAxiosWithToast from 'hooks/useAxiosWithToast';
import styles from 'styles/recruit/layout.module.scss';

type RecruitLayoutProps = {
  children: React.ReactNode;
};

const theme = createTheme({
  typography: {
    fontFamily: "'Pretendard', sans-serif", // $common-font
  },
});

function RecruitLayout({ children }: RecruitLayoutProps) {
  // useAxiosWithToast();

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.recruitLayout}>
        <div className={styles.recruitContainer}>{children}</div>
      </div>
    </ThemeProvider>
  );
}

export default RecruitLayout;
