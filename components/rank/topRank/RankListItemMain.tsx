import Link from 'next/link';
import React from 'react';
import { userImages } from 'types/rankTypes';
import { useRecoilValue } from 'recoil';
import { RankUser, NormalUser } from 'types/rankTypes';
import { colorToggleSelector } from 'utils/recoil/colorMode';
import PlayerImage from 'components/PlayerImage';
import { TbQuestionMark } from 'react-icons/tb';
import styles from 'styles/rank/RankListMain.module.scss';

interface RankListItemMainProps {
  rank: number;
  user: userImages;
}

export default function RankListItemMain({
  user,
  rank,
}: RankListItemMainProps) {
  const { intraId, userImageUri, tierImageUri } = user || {};
  const Mode = useRecoilValue(colorToggleSelector);
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
                  // TODO: edge 추가
                  styleName={
                    rank === 1
                      ? `ranktropybig ${'edge1'}`
                      : `ranktropy ${'edge2'}`
                  }
                  size={50}
                />
                <div className={`${styles.tierImageId}`}>
                  <PlayerImage
                    src={tierImageUri}
                    styleName={'ranktier'}
                    size={10}
                  />
                  {intraId}
                </div>
              </Link>
            ) : (
              <div>
                <div className={`${styles.questionCircleRank}`}>
                  {
                    <TbQuestionMark
                      className={` ${rank === 1 ? styles.rank1 : styles.ranks}`}
                    />
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
            {rank}
          </div>
        </div>
      </div>
    </div>
  );
}
