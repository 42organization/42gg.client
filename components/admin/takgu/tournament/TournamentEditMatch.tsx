import Image from 'next/legacy/image';
import {
  Match,
  MatchComponentProps,
  Participant,
} from '@g-loot/react-tournament-brackets/dist/src/types';
import { useContext, useRef, useState } from 'react';
import { TournamentIdContext } from 'components/takgu/modal/admin/AdminEditTournamentBraket';
import PlayerImage from 'components/takgu/PlayerImage';
import useTournamentMatchEditor from 'hooks/takgu/tournament/useTournamentMatchEditor';
import styles from 'styles/admin/takgu/tournament/TournamentEditMatch.module.scss';

interface TournamentMatchPartyProps {
  party: Participant;
  teamNameFallback: string;
  resultFallback: (participant: Participant) => string;
  onMouseEnter: (partyId: string | number) => void;
}

function TournamentMatchParty({
  party,
  teamNameFallback,
  onMouseEnter,
  resultFallback,
}: TournamentMatchPartyProps) {
  return (
    <div
      className={styles.tournamentPartyWrapper}
      onMouseEnter={() => onMouseEnter(party.id)}
    >
      <img
        className={styles.playerImage}
        src={party.picture ?? '/image/takgu/match_qustion.png'}
      />

      <div className={styles.partyName}>{party.name || teamNameFallback}</div>
      <div className={styles.score}>
        {party.resultText ?? resultFallback(party)}
      </div>
    </div>
  );
}

interface TournamentMatchProps {
  topParty: Participant;
  bottomParty: Participant;
  teamNameFallback: string;
  resultFallback: (participant: Participant) => string;
  onMouseEnter: (partyId: string | number) => void;
}

function TournamentMatch({
  topParty,
  bottomParty,
  teamNameFallback,
  onMouseEnter,
  resultFallback,
}: TournamentMatchProps) {
  return (
    <>
      <TournamentMatchParty
        party={topParty}
        teamNameFallback={teamNameFallback}
        onMouseEnter={onMouseEnter}
        resultFallback={resultFallback}
      ></TournamentMatchParty>
      <TournamentMatchParty
        party={bottomParty}
        teamNameFallback={teamNameFallback}
        onMouseEnter={onMouseEnter}
        resultFallback={resultFallback}
      ></TournamentMatchParty>
    </>
  );
}

interface TournamentEditMatchPartyProps {
  party: Participant;
  handleScoreInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function TournamentEditMatchParty({
  party,
  handleScoreInputChange,
}: TournamentEditMatchPartyProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={styles.tournamentPartyWrapper}>
      <img
        className={styles.playerImage}
        src={party.picture ?? '/image/takgu/match_qustion.png'}
      />

      <div className={styles.partyName}>{party.name}</div>
      <input
        ref={inputRef}
        className={styles.scoreInput}
        name={`team-${party.id}-score`}
        value={party.resultText ?? ''}
        onChange={handleScoreInputChange}
        onClick={() => {
          inputRef.current?.focus();
        }}
      />
    </div>
  );
}

interface TournamentMatchEditorProps {
  topParty: Participant;
  bottomParty: Participant;
  unsetEditor: () => void;
  handleScoreInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  putHandler: () => void;
}

function TournamentMatchEditor({
  topParty,
  bottomParty,
  unsetEditor,
  handleScoreInputChange,
  putHandler,
}: TournamentMatchEditorProps) {
  return (
    <>
      <TournamentEditMatchParty
        party={topParty}
        handleScoreInputChange={handleScoreInputChange}
      />
      <TournamentEditMatchParty
        party={bottomParty}
        handleScoreInputChange={handleScoreInputChange}
      />
      <div className={styles.buttonsContainer}>
        <button onClick={unsetEditor}>취소</button>
        <button onClick={putHandler}>수정하기</button>
      </div>
    </>
  );
}

export default function TournamentEditMatch({
  match,
  onMouseEnter,
  teamNameFallback,
  resultFallback,
}: MatchComponentProps) {
  const tournamentId = useContext(TournamentIdContext);
  const {
    isEditor,
    topParty,
    bottomParty,
    setEditor,
    unsetEditor,
    handleScoreInputChange,
    putHandler,
  } = useTournamentMatchEditor(match, tournamentId);
  return (
    <>
      <div
        className={
          match.isModifiable && isEditor === false
            ? styles.tournamentEditMatchContainer
            : styles.tournamentMatchContainer
        }
      >
        {match.isModifiable && isEditor === false && (
          <button
            className={styles.tournamentEditMatchButton}
            onClick={setEditor}
          >
            수정하기
          </button>
        )}
        {isEditor === true ? (
          <TournamentMatchEditor
            topParty={topParty}
            bottomParty={bottomParty}
            unsetEditor={unsetEditor}
            handleScoreInputChange={handleScoreInputChange}
            putHandler={putHandler}
          />
        ) : (
          <TournamentMatch
            topParty={topParty}
            bottomParty={bottomParty}
            teamNameFallback={teamNameFallback}
            onMouseEnter={onMouseEnter}
            resultFallback={resultFallback}
          />
        )}
      </div>
    </>
  );
}
