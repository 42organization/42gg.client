import { useState } from 'react';
import { TeamInfoProps } from 'types/agenda/teamDetail/TeamInfoTypes';
import { colorMapping } from 'types/agenda/utils/colorList';
import { TeamStatus, Authority } from 'constants/agenda/agenda';
import { ShareBtn } from 'components/agenda/button/Buttons';
import CreateTeamForm from 'components/agenda/Form/CreateTeamForm';
import TeamButtons from 'components/agenda/teamDetail/TeamButtons';
import AgendaLoading from 'components/agenda/utils/AgendaLoading';
import EditIcon from 'public/image/agenda/edit.svg';
import useAgendaKey from 'hooks/agenda/useAgendaKey';
import styles from 'styles/agenda/TeamDetail/TeamInfo.module.scss';

const TeamInfo = ({
  teamDetail,
  shareTeamInfo,
  maxPeople,
  authority,
  manageTeamDetail,
  submitTeamForm,
}: TeamInfoProps) => {
  // EditTeam UI <-> TeamInfo UI 전환
  const [convert, setConvert] = useState(true);
  const agendaKey = useAgendaKey();

  const handleConvert = () => {
    setConvert(!convert);
  };

  if (!agendaKey) {
    return <AgendaLoading />;
  }
  return convert ? (
    /* TeamInfo */
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>{teamDetail.teamName}</h1>
          {teamDetail.teamStatus === TeamStatus.OPEN &&
          authority === Authority.LEADER ? (
            <div className={styles.iconWrapper}>
              <EditIcon onClick={() => setConvert(!convert)} />
            </div>
          ) : (
            ''
          )}

          <div className={styles.marginTop}>
            <ShareBtn onClick={shareTeamInfo} />
          </div>
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

                <div className={styles.mateCount}>
                  <div className={styles.countBox}>참여인원</div>
                  <div>{`${teamDetail.teamMates.length} / ${maxPeople}`}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <TeamButtons
        authority={authority}
        teamStatus={teamDetail.teamStatus}
        manageTeamDetail={manageTeamDetail}
      />
    </>
  ) : (
    /* EditTeam */
    <>
      <div className={styles.container}>
        <h2 className={styles.title}>팀 수정하기</h2>
        <CreateTeamForm
          location={teamDetail.teamLocation}
          isEdit={true}
          agendaKey={agendaKey as string}
          teamDetail={teamDetail}
          onProceed={submitTeamForm}
          handleConvert={handleConvert}
        />
      </div>
    </>
  );
};

export default TeamInfo;
