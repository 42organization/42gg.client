import {
  MatchComponentProps,
  Participant,
} from '@g-loot/react-tournament-brackets/dist/src/types';
import PlayerImage from 'components/PlayerImage';
import styles from 'styles/tournament/TournamentMatch.module.scss';

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
}: MatchComponentProps) {
  return (
    <div className={styles.tournamentMatchContainer}>
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
    </div>
  );
}
