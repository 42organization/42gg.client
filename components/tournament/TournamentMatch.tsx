import {
  MatchComponentProps,
  Participant,
} from '@g-loot/react-tournament-brackets/dist/src/types';
import { useRecoilValue } from 'recoil';
import { clickedTournamentState } from 'utils/recoil/tournament';
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

  return (
    <div
      className={`${styles.tournamentPartyWrapper} ${
        highLightUser !== '' && highLightUser === party.name
          ? styles.highlight
          : ''
      }`}
      onMouseEnter={() => onMouseEnter(party.id)}
      onClick={() => onPartyClick(party, false)}
      onTouchStart={() => {
        onPartyClick(party, false);
      }}
    >
      {/* next/image의 Image 컴포넌트로 objectFit, layout 속성 적용하려면 부모 컨테이너에
      position: relative 혹은 absolute 가 적용되어있어야 하는데, 그럴 경우 브라켓에서 이미지가 벗어나는
      문제가 있으므로 임시 방편으로 img 태그를 사용합니다. */}
      <div className={styles.imageWrap}>
        <img src={party.picture} className={styles.playerImage} alt='player' />
      </div>
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
