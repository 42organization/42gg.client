import Link from 'next/link';
import { useRouter } from 'next/router';
import { Key } from '@mui/icons-material';
import ColorList from 'components/agenda/agendaDetail/taps/ColorList';
import TeamLeaderIcon from 'public/image/agenda/rock-and-roll-hand.svg';
import styles from 'styles/agenda/agendaDetail/taps/ParticipantTeam.module.scss';

interface ParticipantTeamProps {
  teamKey: string;
  teamName: string;
  teamLeaderIntraId: string;
  teamMateCount: number;
  maxMateCount: number;
}

export default function ParticipantTeam({
  teamKey,
  teamName,
  teamLeaderIntraId,
  teamMateCount,
  maxMateCount,
}: ParticipantTeamProps) {
  const router = useRouter();
  const { agendaKey } = router.query;

  return (
    <>
      <Link
        className={styles.participantTeamContainer}
        href={`/agenda/${agendaKey}/${teamKey}`}
      >
        <div className={styles.titleWarp}>
          <div className={styles.infoWarp}>
            <div className={styles.teamTitle}>{teamName}</div>

            <div className={styles.teamLeader}>
              <TeamLeaderIcon className={styles.LeaderIcon} />
              <p>{teamLeaderIntraId}</p>
            </div>
          </div>

          <div className={styles.headCount}>
            {teamMateCount} / {maxMateCount}
          </div>
        </div>

        <ColorList />
      </Link>
    </>
  );
}
