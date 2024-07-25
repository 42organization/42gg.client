import { useState, useCallback } from 'react';
import { ITournamentEditInfo } from 'types/admin/adminTournamentTypes';

const emptyTournamentEditInfo: ITournamentEditInfo = {
  tournamentId: null,
  title: '',
  contents: '',
  type: 'CUSTOM',
  startTime: '',
  endTime: '',
};

function useTournamentEditInfo() {
  const [tournamentEditInfo, setTournamentEditInfo] =
    useState<ITournamentEditInfo>(emptyTournamentEditInfo);

  // change
  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTournamentEditInfo((prev) => ({ ...prev, [name]: value }));
  };

  const selectChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setTournamentEditInfo((prev) => ({ ...prev, [name]: value }));
  };

  const quillChangeHandler = (value: string) => {
    setTournamentEditInfo((prev) => ({ ...prev, contents: value }));
  };

  const resetHandler = async () => {
    try {
      setTournamentEditInfo(emptyTournamentEditInfo);
    } catch (e) {
      alert(e);
    }
  };
  return {
    tournamentEditInfo,
    setTournamentEditInfo,
    inputChangeHandler,
    selectChangeHandler,
    quillChangeHandler,
    resetHandler,
  };
}

export default useTournamentEditInfo;
