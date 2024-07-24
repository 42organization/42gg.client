import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  ParticipantTeamProps,
  PeopleCount,
} from 'types/agenda/agendaDetail/taps/participantTeamTypes';
import { Coalition } from 'constants/agenda/agenda';
import ColorList from 'components/agenda/utils/ColorList';
import TeamLeaderIcon from 'public/image/agenda/rock-and-roll-hand.svg';
import styles from 'styles/agenda/agendaDetail/taps/ParticipantTeam.module.scss';

const peopleCount: PeopleCount = {
  [Coalition.GUN]: 2,
  [Coalition.GON]: 7,
  [Coalition.GAM]: 1,
  [Coalition.LEE]: 3,
};

const totalPeople = (peopleCount: PeopleCount) => {
  return Object.values(peopleCount).reduce((sum, count) => sum + count, 0);
};

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

        <ColorList
          peopleCount={peopleCount}
          totalPeople={totalPeople(peopleCount)}
        />
      </Link>
    </>
  );
}
