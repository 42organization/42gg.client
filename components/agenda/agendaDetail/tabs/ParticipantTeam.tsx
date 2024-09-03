import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  ParticipantTeamProps,
  PeopleCount,
} from 'types/agenda/agendaDetail/tabs/participantTypes';
import { countCoalitions } from 'components/agenda/utils/coalition/countCoalitions';
import { getCoalitionEnum } from 'components/agenda/utils/coalition/getCoalitionEnum';
import ColorList from 'components/agenda/utils/ColorList';
import TeamLeaderIcon from 'public/image/agenda/rock-and-roll-hand.svg';
import styles from 'styles/agenda/agendaDetail/tabs/ParticipantTeam.module.scss';

const totalPeople = (peopleCount: PeopleCount) => {
  return Object.values(peopleCount).reduce((sum, count) => sum + count, 0);
};

export default function ParticipantTeam({
  teamKey,
  teamName,
  teamLeaderIntraId,
  teamMateCount,
  maxMateCount,
  coalitions,
}: ParticipantTeamProps) {
  const router = useRouter();
  const agendaKey = router.query.agenda_key;
  const coalitionEnum = getCoalitionEnum(coalitions);
  const peopleCount = countCoalitions(coalitionEnum);

  const content = (
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
  );

  const colorList = (
    <ColorList
      peopleCount={peopleCount}
      totalPeople={totalPeople(peopleCount)}
    />
  );

  return (
    <>
      {teamKey ? (
        <Link
          className={styles.participantTeamContainer}
          href={`/agenda/detail/team?agenda_key=${agendaKey}&team_key=${teamKey}`}
        >
          {content}
          {colorList}
        </Link>
      ) : (
        <div
          className={`${styles.participantTeamContainer} ${styles.disabled}`}
        >
          {content}
          {colorList}
        </div>
      )}
    </>
  );
}
