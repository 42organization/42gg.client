import { useRef } from 'react';
import TournamentEdit from 'components/takgu/admin/tournament/TournamentEdit';
import TournamentList from 'components/takgu/admin/tournament/TournamentList';
import useTournamentEditInfo from 'hooks/takgu/tournament/useTournamentEditInfo';
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

  const editorRef = useRef<HTMLDivElement>(null);
  const scrollToEditor = () => {
    editorRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={styles.container}>
      <TournamentEdit
        editorRef={editorRef}
        tournamentEditInfo={tournamentEditInfo}
        inputChangeHandler={inputChangeHandler}
        selectChangehandler={selectChangeHandler}
        quillChangeHandler={quillChangeHandler}
        resetHandler={resetHandler}
      />
      <TournamentList
        scrollToEditor={scrollToEditor}
        tournamentEditInfo={tournamentEditInfo}
        setTournamentEditInfo={setTournamentEditInfo}
      />
    </div>
  );
}
