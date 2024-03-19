import { useRouter } from 'next/router';
import { HomeOutlined, ReplyRounded } from '@mui/icons-material';
import { Button } from '@mui/material';
import applicationStyle from 'styles/recruit/application.module.scss';

export default function ApplicatoinFormFooter() {
  const router = useRouter();

  const goRecruitHome = () => {
    router.push('/recruit');
  };

  const goBack = () => {
    router.back();
  };

  return (
    <div className={applicationStyle.stickyFooter}>
      <div className={applicationStyle.stickyContainer}>
        <Button
          variant='text'
          startIcon={<HomeOutlined />}
          onClick={goRecruitHome}
        >
          모집 메인
        </Button>
        <Button variant='text' startIcon={<ReplyRounded />} onClick={goBack}>
          뒤로 가기
        </Button>
      </div>
    </div>
  );
}
