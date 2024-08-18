import { useRouter } from 'next/router';
import ModifyAgendaForm from 'components/agenda/Form/ModifyAgendaForm';
import { submitTeamForm } from 'pages/agenda/create';
import styles from 'styles/admin/agenda/agendaList/AgendaModify.module.scss';
const AgendaAdminDetail = () => {
  const router = useRouter();
  const { agendaKey } = router.query;
  // const data = await instance.get(
  //   `/agenda/admin/request/list?page=${currentPage}&size=10`
  // );
  const data = {
    agendaId: 5,
    agendaKey: '48809a85-a171-4dfd-8470-3c37005e8493',
    agendaTitle: '팀 16일 마감(결과전송 테스트용)',
    agendaDeadLine: '2024-08-16T00:00:00',
    agendaStartTime: '2024-08-16T13:00:00',
    agendaEndTime: '2024-08-16T14:00:00',
    agendaCurrentTeam: 0,
    agendaMaxTeam: 15,
    agendaMinPeople: 1,
    agendaMaxPeople: 3,
    agendaLocation: 'SEOUL',
    isRanking: true,
    isOfficial: false,
    agendaStatus: 'OPEN',
    agendaPosterUrl:
      'https://gg-public-test-image.s3.ap-northeast-2.amazonaws.com/images/%ED%8C%80%2016%EC%9D%BC%20%EB%A7%88%EA%B0%90%28%EA%B2%B0%EA%B3%BC%EC%A0%84%EC%86%A1%20%ED%85%8C%EC%8A%A4%ED%8A%B8%EC%9A%A9%29-22ec90e4-339d-4101-a407-41a8de889eab.jpeg',
  };

  return (
    <>
      <div className={styles.layout}>
        <div>{agendaKey}</div>
        <div>Agenda Admin Detail</div>
        <div className={styles.form}>
          <ModifyAgendaForm data={data} handleSubmit={submitTeamForm} />
        </div>
      </div>
      s
    </>
  );
};

export default AgendaAdminDetail;
