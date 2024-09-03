import router from 'next/router';
import { TeamDetailProps } from 'types/agenda/teamDetail/TeamDetailTypes';
import AdminTeamForm from 'components/agenda/Form/AdminTeamForm';
import useFetchGet from 'hooks/agenda/useFetchGet';
import styles from 'styles/agenda/pages/create-team.module.scss';

const TeamModify = () => {
  const { team_key, location } = router.query;

  const teamData = useFetchGet<TeamDetailProps>('admin/team', {
    team_key: team_key as string,
  }).data;

  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.title}>팀 수정하기</h2>
        <p className={styles.description}>팀 인원 : 3명-8명까지 가능</p>
        {teamData ? (
          <AdminTeamForm
            teamKey={team_key as string}
            teamData={teamData}
            teamLocation={location as string}
          />
        ) : (
          ''
        )}
      </div>
    </>
  );
};

export default TeamModify;
