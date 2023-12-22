import {
  Match,
  Participant,
} from '@g-loot/react-tournament-brackets/dist/src/types';
import { useState } from 'react';
import { instance, instanceInManage } from 'utils/axios';

const emptyParty: Participant = {
  id: '',
  name: '',
  resultText: '',
};

export default function useTournamentMatchEditor(
  initMatch: Match,
  tournamentId: number
) {
  const initTopParty = initMatch.participants[0];
  const initBottomParty = initMatch.participants[1];

  const [topParty, setTopParty] = useState<Participant>(
    initMatch.participants[0] ?? emptyParty
  );
  const [bottomParty, setBottomParty] = useState<Participant>(
    initMatch.participants[1] ?? emptyParty
  );
  const [isEditor, setIsEditor] = useState<boolean>(false);
  const [match, setMatch] = useState<Match>(initMatch);

  const setEditor = () => {
    if (match.isModifiable === true && isEditor === false) setIsEditor(true);
  };

  const unsetEditor = () => {
    setTopParty(initTopParty);
    setBottomParty(initBottomParty);
    setIsEditor(false);
  };

  const handleScoreInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    if (name === `team-${topParty.id}-score`) {
      setTopParty((topParty) => ({
        ...topParty,
        resultText: value,
      }));
    } else if (name === `team-${bottomParty.id}-score`) {
      setBottomParty((bottomParty) => ({
        ...bottomParty,
        resultText: value,
      }));
    }
  };

  const putHandler = async () => {
    try {
      const res = await instanceInManage.patch(
        `/tournaments/${tournamentId}/games`,
        {
          tournamentGameId: match.id,
          nextTournamentGameId: match.nextMatchId,
          team1: {
            teamId: topParty.id,
            score: parseInt(topParty.resultText ? topParty.resultText : '0'),
          },
          team2: {
            teamId: bottomParty.id,
            score: parseInt(
              bottomParty.resultText ? bottomParty.resultText : '0'
            ),
          },
        }
      );
    } catch (e) {
      alert(e);
    }
  };

  return {
    isEditor,
    topParty,
    bottomParty,
    setEditor,
    unsetEditor,
    handleScoreInputChange,
    putHandler,
  };
}
