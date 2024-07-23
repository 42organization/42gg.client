import { useState } from 'react';
import { TeamDetailProps } from 'types/aganda/TeamDetailTypes';
import { TeamStatus, Coalition, AgendaLocation } from 'constants/agenda/agenda';
import colorstyles from 'styles/agenda/coalition.module.scss';
import styles from 'styles/agenda/TeamDetail/TeamInfo.module.scss';
import { ShareBtn } from '../button/Buttons';

//인원 받아올려면 Team Max 인원 받아와야 함
const TeamInfo = () => {
  const [teamDetail, setTeamDetail] = useState<TeamDetailProps>({
    teamName: '팀이름',
    teamLeaderIntraId: 'leader',
    teamStatus: TeamStatus.OPEN, //e
    teamLocation: AgendaLocation.MIX, //e
    teamContent: '우리팀이세계최강팀',
    teamMates: [
      {
        intraId: 'leader',
        coalition: Coalition.GUN, //e
      },
      {
        intraId: 'member1',
        coalition: Coalition.SPRING,
      },
      {
        intraId: 'member1',
        coalition: Coalition.SPRING,
      },
      {
        intraId: 'member1',
        coalition: Coalition.SPRING,
      },
      {
        intraId: 'member2',
        coalition: Coalition.SUMMER,
      },
    ],
  });

  if (teamDetail.teamStatus === TeamStatus.CANCEL) {
    setTeamDetail({ ...teamDetail, teamStatus: TeamStatus.CONFIRM });
  }

  const colorMapping: { [key: string]: string } = {
    [Coalition.GUN]: colorstyles.bg_gun,
    [Coalition.GON]: colorstyles.bg_gon,
    [Coalition.GAM]: colorstyles.bg_gam,
    [Coalition.LEE]: colorstyles.bg_lee,
    [Coalition.SPRING]: colorstyles.bg_spring,
    [Coalition.SUMMER]: colorstyles.bg_summer,
    [Coalition.AUTUMN]: colorstyles.bg_autumn,
    [Coalition.WINTER]: colorstyles.bg_winter,
    [Coalition.OTHER]: colorstyles.bg_default,
  };

  const shareTeamInfo = () => {
    alert('공유하기');
  };
  console.log(colorMapping[teamDetail.teamMates[0].coalition]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>{teamDetail.teamName}</h1>
        <ShareBtn onClick={shareTeamInfo} />
      </div>
      <div className={styles.description}>
        <p>{teamDetail.teamContent}</p>
      </div>
      <div className={styles.teamMateInfo}>
        {teamDetail.teamMates?.map((mate, idx) => {
          const isConnectedUp =
            (idx > 0 &&
              teamDetail.teamMates[idx - 1].coalition === mate.coalition) ||
            false;
          const isConnectedDown =
            (idx < teamDetail.teamMates.length - 1 &&
              teamDetail.teamMates[idx + 1].coalition === mate.coalition) ||
            false;
          return (
            <div className={styles.mateContainer} key={idx}>
              <div
                className={`${styles.coalitionColor} ${
                  isConnectedUp ? styles.connectedUp : ''
                } ${isConnectedDown ? styles.connectedDown : ''} ${
                  colorMapping[mate.coalition]
                }`}
              ></div>
              <div className={styles.mateName}>
                <p>
                  {mate.intraId}{' '}
                  {mate.intraId === teamDetail.teamLeaderIntraId && '👑'}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TeamInfo;
