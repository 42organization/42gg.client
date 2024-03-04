import Lottie from 'lottie-react';
import recruitPingpong from 'public/lottie/recruitPingPong.json';
import useCheckRecruit from 'hooks/recruit/useCheckRecruit';
import commonStyle from 'styles/recruit/common.module.scss';
import layoutStyle from 'styles/recruit/layout.module.scss';
import textStyle from 'styles/recruit/text.module.scss';

function Recruit() {
  const { isRecruiting, isLoading } = useCheckRecruit();

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  if (!isLoading && !isRecruiting) {
    return (
      <div className={layoutStyle.recruitContainer}>
        <Lottie
          className={commonStyle.pingpongAnimation}
          animationData={recruitPingpong}
          width={'100%'}
        />
        <span className={textStyle.pageSubTitle}>
          지금은 신규 팀원 모집 기간이 아닙니다.
        </span>
      </div>
    );
  }

  return (
    <div className={layoutStyle.recruitContainer}>
      <span className={textStyle.pageTitle}>42GG 팀원 모집</span>
      <Lottie
        className={commonStyle.pingpongAnimation}
        animationData={recruitPingpong}
        width={'100%'}
      />
    </div>
  );
}

export default Recruit;
