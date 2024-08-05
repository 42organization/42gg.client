import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AgendaDataProps } from 'types/agenda/agendaDetail/agendaDataTypes';
import { AgendaProps } from 'types/agenda/agendaDetail/agendaTypes';
import { instanceInAgenda } from 'utils/axios';
import { AgendaStatus } from 'constants/agenda/agenda';
import ParticipantsList from 'components/agenda/agendaDetail/tabs/ParticipantsList';
import styles from 'styles/agenda/agendaDetail/tabs/AgendaParticipants.module.scss';
import ParticipantTeamList from './ParticipantTeamList';

export default function AgendaParticipants({ agendaData }: AgendaProps) {
  const { agendaMinPeople, agendaMaxPeople, agendaMaxTeam } = agendaData;

  const isTeam = (min: number, max: number) => {
    return min !== max;
  };

  return (
    <>
      <div className={styles.mainWarp}>
        <div className={styles.participantsContainer}>
          {isTeam(agendaMinPeople, agendaMaxPeople) ? (
            <ParticipantTeamList max={agendaMaxTeam} />
          ) : (
            <ParticipantsList max={agendaMaxTeam} />
          )}
        </div>
      </div>
    </>
  );
}
