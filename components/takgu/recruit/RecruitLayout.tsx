import { ThemeProvider, createTheme } from '@mui/material';
// import useAxiosWithToast from 'hooks/useAxiosWithToast';
import styles from 'styles/takgu/recruit/layout.module.scss';
import ApplicationSnackBar from './Application/ApplicationSnackBar';

type RecruitLayoutProps = {
  children: React.ReactNode;
};

const theme = createTheme({
  typography: {
    fontFamily: "'Pretendard', sans-serif", // $common-font
  },
  palette: {
    primary: {
      main: '#8EBCF9',
      light: '#C8ECFF',
      dark: '#6394AE',
    },
    // TODO : 색깔 다시 확인해보기..
    // secondary: {
    //   main: '#8C92AC',
    //   light: '#DCDEE6',
    //   dark: '#494E65',
    // },
    secondary: {
      main: '#8c92ac',
      light: '#f6f6f6',
      dark: '#494E65',
    },
  },
});

function RecruitLayout({ children }: RecruitLayoutProps) {
  // useAxiosWithToast();

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.recruitLayout}>
        <div className={styles.recruitContainer}>{children}</div>
      </div>
      <ApplicationSnackBar />
    </ThemeProvider>
  );
}

export default RecruitLayout;
