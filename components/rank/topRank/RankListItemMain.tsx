import Link from 'next/link';
import React from 'react';
import { RankUser, NormalUser } from 'types/rankTypes';
import styles from 'styles/rank/RankListMain.module.scss';
import PlayerImage from 'components/PlayerImage';
import { TbQuestionMark } from 'react-icons/tb';
import { useRecoilValue } from 'recoil';
import { colorToggleSelector } from 'utils/recoil/colorMode';

interface RankListItemMainProps {
  user: NormalUser | RankUser;
}

export default function RankListItemMain({ user }: RankListItemMainProps) {
  const { rank, intraId, userImageUri } = user;
  const Mode = useRecoilValue(colorToggleSelector);
  const rankFiltered = rank < 0 ? '-' : rank;
  const renderLink = intraId !== 'intraId';

  return (
    <div className={`${styles.mainData} ${Mode === 'NORMAL' && styles.normal}`}>
      <div
        className={`${rank === 1 ? styles.leaf : ''} ${
          Mode === 'NORMAL' && styles.normal
        }`}
      >
        <div
          className={`${rank === 1 ? styles.leaf1 : ''} ${
            Mode === 'NORMAL' && styles.normal
          }`}
        >
          <div
            className={`${styles.intraId} ${rank === 1 && styles.first} ${
              rank === 3 && styles.last
            }`}
          >
            {renderLink ? (
              <Link href={`users/detail?intraId=${intraId}`}>
                <PlayerImage
                  src={userImageUri}
                  styleName={rank === 1 ? 'ranktropybig' : 'ranktropy'}
                  size={50}
                />
                <span>{intraId}</span>
              </Link>
            ) : (
              <div>
                <div className={`${styles.questionCircleRank}`}>
                  {
                    <TbQuestionMark className={` ${rank === 1 ? styles.rank1 : styles.ranks}`}/>
                  }
                </div>
                <span>{intraId}</span>
              </div>
            )}
          </div>
          <div
            className={`${styles[`rankNumber${rank}`]} 
            ${Mode === 'NORMAL' && styles.normal}`}
          >
            {rankFiltered}
          </div>
        </div>
      </div>
    </div>
  );
}
