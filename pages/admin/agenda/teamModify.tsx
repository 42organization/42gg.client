import router from 'next/router';
import { TeamDetailProps } from 'types/agenda/teamDetail/TeamDetailTypes';
import AdminTeamForm from 'components/agenda/Form/AdminTeamForm';
import useFetchGet from 'hooks/agenda/useFetchGet';
import styles from 'styles/agenda/pages/create-team.module.scss';

const TeamModify = () => {
  const { team_key, location } = router.query;
  const readyState = Boolean(team_key); // + team_key router.query 써서 쿼리로 못가져왔을 시, 에러 가능성 있음

  const teamData = useFetchGet<TeamDetailProps>({
    url: 'admin/team',
    isReady: readyState,
    params: {
      team_key: team_key as string,
    },
  }).data;

  return (
    <>
      <div className={styles.modifyContainer}>
        <div className={styles.container}>
          <h2 className={styles.title}>팀 수정하기</h2>
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
      </div>
    </>
  );
};

export default TeamModify;
