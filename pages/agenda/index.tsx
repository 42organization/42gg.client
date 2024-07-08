import Link from 'next/link';
import type { NextPage } from 'next';

const Agenda: NextPage = () => {
  const agendaKey = 1;

  return (
    <div>
      <h1>ageda</h1>
      <div key={agendaKey}>
        <Link href={`/agenda/${agendaKey}`}>1번방</Link>
      </div>

      <div>
        <Link href={`/agenda/create`}>agenda 생성</Link>
      </div>
      <div>
        <Link href={`/agenda/profile`}>내 프로필</Link>
      </div>
      <div>
        <Link href={`/agenda/admin`}>agenda admin</Link>
      </div>
    </div>
  );
};

export default Agenda;
