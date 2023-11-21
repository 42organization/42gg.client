import Image from 'next/image';
import {
  MatchComponentProps,
  Participant,
} from '@g-loot/react-tournament-brackets/dist/src/types';
import PlayerImage from 'components/PlayerImage';

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
      onMouseEnter={() => onMouseEnter(party.id)}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '50%',
      }}
    >
      <PlayerImage
        src={party.picture ?? '/image/match_qustion.png'}
        styleName={`tournament`}
        size={1}
      />

      <div>{party.name || teamNameFallback}</div>
      <div style={{ marginLeft: 'auto' }}>
        {party.resultText ?? resultFallback(party)}
        {/* <input value={topParty.resultText ?? resultFallback(topParty)} /> */}
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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        color: '#000',
        width: '100%',
        height: '100%',
      }}
    >
      <TournamentMatchParty
        party={topParty}
        teamNameFallback={teamNameFallback}
        onMouseEnter={onMouseEnter}
        resultFallback={resultFallback}
      ></TournamentMatchParty>
      <div style={{ height: '1px', width: '100%', background: '#FF8C00' }} />
      <TournamentMatchParty
        party={bottomParty}
        teamNameFallback={teamNameFallback}
        onMouseEnter={onMouseEnter}
        resultFallback={resultFallback}
      ></TournamentMatchParty>
    </div>
  );
}
