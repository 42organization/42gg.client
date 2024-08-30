import { useRef } from 'react';
import TournamentEdit from 'components/admin/takgu/tournament/TournamentEdit';
import TournamentList from 'components/admin/takgu/tournament/TournamentList';
import useTournamentEditInfo from 'hooks/takgu/tournament/useTournamentEditInfo';
import styles from 'styles/admin/takgu/tournament/Tournament.module.scss';

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
