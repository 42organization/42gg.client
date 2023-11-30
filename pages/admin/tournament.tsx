import { useState } from 'react';
import TournamentEdit from 'components/admin/tournament/TournamentEdit';
import TournamentList from 'components/admin/tournament/TournamentList';
import useTournamentEditInfo from 'hooks/tournament/useTournamentEditInfo';
import styles from 'styles/admin/tournament/Tournament.module.scss';

export default function Tournament() {
  const {
    tournamentEditInfo,
    setTournamentEditInfo,
    inputChangeHandler,
    selectChangeHandler,
    quillChangeHandler,
    resetHandler,
  } = useTournamentEditInfo();

  return (
    <div className={styles.container}>
      <TournamentEdit
        tournamentEditInfo={tournamentEditInfo}
        inputChangeHandler={inputChangeHandler}
        selectChangehandler={selectChangeHandler}
        quillChangeHandler={quillChangeHandler}
        resetHandler={resetHandler}
      />
      <TournamentList
        tournamentEditInfo={tournamentEditInfo}
        setTournamentEditInfo={setTournamentEditInfo}
      />
    </div>
  );
}
