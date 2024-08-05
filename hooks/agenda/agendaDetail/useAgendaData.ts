import { useEffect, useState } from 'react';
import { AgendaDataProps } from 'types/agenda/agendaDetail/agendaTypes';
import { instanceInAgenda } from 'utils/axios';

export const useAgendaData = (agendaKey: string) => {
  const [agendaData, setAgendaData] = useState<AgendaDataProps>();

  useEffect(() => {
    const fetchAgendaData = async () => {
      if (agendaKey) {
        try {
          const res = await instanceInAgenda.get(`?agenda_key=${agendaKey}`);
          setAgendaData(res.data);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchAgendaData();
  }, [agendaKey]);

  return agendaData;
};
