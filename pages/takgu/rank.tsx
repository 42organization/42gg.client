import { useRecoilValue } from 'recoil';
import { colorToggleSelector } from 'utils/recoil/colorMode';
import RankModeWrap from 'components/mode/modeWraps/RankModeWrap';
import MyRank from 'components/rank/MyRank';
import RankList from 'components/rank/RankList';
import useColorMode from 'hooks/useColorMode';
import styles from 'styles/rank/RankList.module.scss';

export default function Rank() {
  const Mode = useRecoilValue(colorToggleSelector);

  useColorMode('RANK');

  const content = {
    RANK: { style: '', title: 'Ranking' },
    NORMAL: { style: styles.vip, title: 'VIP' },
  };

  return (
    <div className={styles.pageWrap}>
      <h1 className={`${styles.title} ${content[Mode].style}`}>
        {content[Mode].title}
      </h1>
      <MyRank />
      <RankModeWrap>
        <RankList />
      </RankModeWrap>
    </div>
  );
}
