import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  ParticipantTeamProps,
  PeopleCount,
} from 'types/agenda/agendaDetail/tabs/participantTeamTypes';
import { Coalition, coalitionValues } from 'constants/agenda/agenda';
import { getCoalitionEnum } from 'components/agenda/utils/coalition/getCoalitionEnum';
import ColorList from 'components/agenda/utils/ColorList';
import TeamLeaderIcon from 'public/image/agenda/rock-and-roll-hand.svg';
import styles from 'styles/agenda/agendaDetail/tabs/ParticipantTeam.module.scss';

const peopleCount: PeopleCount = {
  [Coalition.GUN]: 2,
  [Coalition.GON]: 7,
  [Coalition.GAM]: 1,
  [Coalition.LEE]: 3,
};

const totalPeople = (peopleCount: PeopleCount) => {
  return Object.values(peopleCount).reduce((sum, count) => sum + count, 0);
};

function countCoalitions(coalitions: Coalition[]): PeopleCount {
  const peopleCount: PeopleCount = {};

  coalitions.forEach((item) => {
    if (coalitionValues.includes(item as Coalition)) {
      if (!peopleCount[item as Coalition]) {
        peopleCount[item as Coalition] = 0; // 초기화
      }
      peopleCount[item as Coalition] += 1; // 개수 증가
    }
  });

  return peopleCount;
}

export default function ParticipantTeam({
  teamKey,
  teamName,
  teamLeaderIntraId,
  teamMateCount,
  maxMateCount,
  coalitions,
}: ParticipantTeamProps) {
  const router = useRouter();
  const { agendaKey } = router.query;
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
          href={`/agenda/${agendaKey}/${teamKey}`}
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
