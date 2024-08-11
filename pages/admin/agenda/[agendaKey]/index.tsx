import { useRouter } from 'next/router';

const AgendaAdminDetail = () => {
  const router = useRouter();
  const { agendaKey } = router.query;

  return (
    <>
      <div>{agendaKey}</div>
      <div>Agenda Admin Detail</div>
    </>
  );
};

export default AgendaAdminDetail;
