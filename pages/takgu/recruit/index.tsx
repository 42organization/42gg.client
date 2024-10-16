import dynamic from 'next/dynamic';
import { Button } from '@mui/material';
import RecruitList from 'components/takgu/recruit/RecruitList';
import StickyHeader from 'components/takgu/recruit/StickyHeader';
import useCheckRecruit from 'hooks/takgu/recruit/useCheckRecruit';
import commonStyle from 'styles/takgu/recruit/common.module.scss';
import layoutStyle from 'styles/takgu/recruit/layout.module.scss';
import textStyle from 'styles/takgu/recruit/text.module.scss';

// Lottie 컴포넌트를 동적으로 임포트
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

function Recruit() {
  const { isRecruiting, isLoading } = useCheckRecruit();

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  if (!isLoading && !isRecruiting) {
    return (
      <div className={layoutStyle.noRecruit}>
        <Lottie
          className={commonStyle.pingpongAnimation}
          animationData={require('public/lottie/recruitPingPong.json')}
          width={'100%'}
        />
        <span className={textStyle.pageSubTitle}>
          지금은 신규 팀원 모집 기간이 아닙니다.
        </span>
        <Button size={'large'} variant={'contained'} color={'primary'} href='/'>
          42GG로 돌아가기
        </Button>
      </div>
    );
  }

  return (
    <>
      <StickyHeader headerTitle={'42GG 팀원 모집'} />
      <Lottie
        className={commonStyle.pingpongAnimation}
        animationData={require('public/lottie/recruitPingPong.json')}
        width={'100%'}
      />
      <RecruitList />
    </>
  );
}

export default Recruit;
