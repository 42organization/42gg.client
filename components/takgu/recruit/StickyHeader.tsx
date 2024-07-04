import { usePathname, useRouter } from 'next/navigation';
import { HomeOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';
import commonStyle from 'styles/takgu/recruit/common.module.scss';
import textStyle from 'styles/takgu/recruit/text.module.scss';

const StickyHeader = ({ headerTitle }: { headerTitle: string }) => {
  const router = useRouter();
  const pathName = usePathname();
  const goHome = () => {
    router.push('/takgu/recruit');
  };
  return (
    <div className={commonStyle.stickyHeader}>
      <span className={textStyle.headerTitle}>{headerTitle}</span>
      {pathName !== '/takgu/recruit' && (
        <Button
          className={commonStyle.homeBtn}
          variant='text'
          startIcon={<HomeOutlined />}
          onClick={goHome}
        >
          모집 메인
        </Button>
      )}
    </div>
  );
};

export default StickyHeader;
