import Link from 'next/link';
import { useRouter } from 'next/router';
import AgendaInfo from 'components/agenda/agendaDetail/AgendaInfo';
import AgendaTab from 'components/agenda/agendaDetail/AgendaTab';
import { useAgendaData } from 'hooks/agenda/agendaDetail/useAgendaData';
import styles from 'styles/agenda/agendaDetail/AgendaDetail.module.scss';

export default function AgendaDetail() {
  const router = useRouter();
  const { agendaKey } = router.query;
  const teamUID = 1;

  const agendaData = useAgendaData(agendaKey as string);

  return (
    <>
      <div className={styles.agendaDetailWrap}>
        {agendaData ? (
          <>
            <AgendaInfo agendaData={agendaData} />
            <AgendaTab agendaData={agendaData} />
          </>
        ) : (
          <p>Loading...</p>
        )}

        <div key={teamUID}>
          <Link href={`/agenda/${agendaKey}/${teamUID}`}>1번 팀</Link>
        </div>
      </div>
    </>
  );
}
