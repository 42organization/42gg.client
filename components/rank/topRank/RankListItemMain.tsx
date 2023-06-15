import Link from 'next/link';
import React, { useContext } from 'react';
import { RankUser, NormalUser } from 'types/rankTypes';
import styles from 'styles/rank/RankListMain.module.scss';
import PlayerImage from 'components/PlayerImage';
import { ToggleModeContext } from '../RankList';
import { TbQuestionMark } from 'react-icons/tb';
interface RankListItemMainProps {
  user: NormalUser | RankUser;
}

export default function RankListItemMain({ user }: RankListItemMainProps) {
  const { rank, intraId, userImageUri } = user;
  const rankFiltered = rank < 0 ? '-' : rank;
  const toggleMode = useContext(ToggleModeContext);
  const renderLink = intraId !== 'intraId';
  return (
    <div
      className={`${styles.mainData} ${
        toggleMode === 'NORMAL' && styles.normal
      }`}
    >
      <div
        className={`${rank === 1 ? styles.leaf : ''} ${
          toggleMode === 'NORMAL' && styles.normal
        }`}
      >
        <div
          className={`${rank === 1 ? styles.leaf1 : ''} ${
            toggleMode === 'NORMAL' && styles.normal
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
              </Link>
            ) : (
              <div className={`${styles.questionCircleRank}`}>
                {
                  <TbQuestionMark
                    color='603B88'
                    size={rank === 1 ? '80' : '65'}
                  />
                }
              </div>
            )}
            <span>{intraId}</span>
          </div>
          <div
            className={`${styles[`rankNumber${rank}`]} 
            ${toggleMode === 'NORMAL' && styles.normal}`}
          >
            {rankFiltered}
          </div>
        </div>
      </div>
    </div>
  );
}
