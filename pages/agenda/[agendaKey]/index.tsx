import Link from 'next/link';
import { useRouter } from 'next/router';

export default function AgendaDetail() {
  const router = useRouter();
  const { agendaKey } = router.query;
  const teamUID = 1;

  return (
    <>
      <div>agenda 상세정보</div>
      <div key={teamUID}>
        <Link href={`/agenda/${agendaKey}/${teamUID}`}>1번 팀</Link>
      </div>
    </>
  );
}
