import {
  MatchComponentProps,
  Participant,
} from '@g-loot/react-tournament-brackets/dist/src/types';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { Highlight } from '@mui/icons-material';
import { clickedTournamentState } from 'utils/recoil/tournament';
import PlayerImage from 'components/PlayerImage';
import styles from 'styles/tournament/TournamentMatch.module.scss';
interface TournamentMatchPartyProps {
  party: Participant;
  teamNameFallback: string;
  resultFallback: (participant: Participant) => string;
  onMouseEnter: (partyId: string | number) => void;
  onPartyClick: (party: Participant, partyWon: boolean) => void;
  highLightUser?: string;
}

function TournamentMatchParty({
  party,
  teamNameFallback,
  onMouseEnter,
  onPartyClick,
  resultFallback,
}: TournamentMatchPartyProps) {
  const highLightUser = useRecoilValue(clickedTournamentState);

  useEffect(() => {
    console.log(highLightUser);
  }, [highLightUser]);

  return (
    <div
      className={`${styles.tournamentPartyWrapper} ${
        highLightUser !== 'TBD' && highLightUser === party.name
          ? styles.highlight
          : ''
      }`}
      onMouseEnter={() => onMouseEnter(party.id)}
      onClick={() => onPartyClick(party, false)}
    >
      <PlayerImage
        src={party.picture ?? '/image/match_qustion.png'}
        styleName={`tournament`}
        size={1}
      />

      <div className={styles.partyName}>{party.name || teamNameFallback}</div>
      <div className={styles.score}>
        {party.resultText ?? resultFallback(party)}
      </div>
    </div>
  );
}

export default function TournamentMatch({
  match,
  onMatchClick,
  onPartyClick,
  onMouseEnter,
  onMouseLeave,
  topParty,
  bottomParty,
  topWon,
  bottomWon,
  topHovered,
  bottomHovered,
  topText,
  bottomText,
  connectorColor,
  computedStyles,
  teamNameFallback,
  resultFallback,
  highLightUser,
  setHighLightUser,
}: MatchComponentProps) {
  return (
    <div className={styles.tournamentMatchContainer}>
      <TournamentMatchParty
        party={topParty}
        teamNameFallback={teamNameFallback}
        onMouseEnter={onMouseEnter}
        onPartyClick={onPartyClick}
        resultFallback={resultFallback}
      ></TournamentMatchParty>
      <TournamentMatchParty
        party={bottomParty}
        teamNameFallback={teamNameFallback}
        onMouseEnter={onMouseEnter}
        onPartyClick={onPartyClick}
        resultFallback={resultFallback}
      ></TournamentMatchParty>
    </div>
  );
}
