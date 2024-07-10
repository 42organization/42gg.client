import Link from 'next/link';
import { useRouter } from 'next/router';
import AgendaInfo from 'components/agenda/agendaDetail/AgendaInfo';
import styles from 'styles/agenda/agendaDetail/AgendaDetail.module.scss';

export default function AgendaDetail() {
  const router = useRouter();
  const { agendaKey } = router.query;
  const teamUID = 1;

  return (
    <>
      <div className={styles.agendaDetailWrap}>
        <AgendaInfo />
        {/* <AgendaTap />
        <AgendaContents />
        <AgendaParticipant />
        <AgendaAnnounce />
        <AgendaCondition /> */}
        <div key={teamUID}>
          <Link href={`/agenda/${agendaKey}/${teamUID}`}>1번 팀</Link>
        </div>
      </div>
    </>
  );
}
