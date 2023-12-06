import dynamic from 'next/dynamic';
import {
  SVGViewer as StaticSVGViewer,
  SingleEliminationBracket as StaticSingleEliminationBracket,
} from '@g-loot/react-tournament-brackets';
import {
  Match,
  Participant,
} from '@g-loot/react-tournament-brackets/dist/src/types';
import React from 'react';
import { useRecoilState } from 'recoil';
import { clickedTournamentState } from 'utils/recoil/tournament';
import TournamentMatch from 'components/tournament/TournamentMatch';

if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
  import('@g-loot/react-tournament-brackets');
}

const SingleEliminationBracket = dynamic<
  React.ComponentProps<typeof StaticSingleEliminationBracket>
>(
  () => {
    return import('@g-loot/react-tournament-brackets').then(
      (mod) => mod.SingleEliminationBracket
    );
  },
  { ssr: false }
);

const SVGViewer = dynamic<React.ComponentProps<typeof StaticSVGViewer>>(
  () => {
    return import('@g-loot/react-tournament-brackets').then(
      (mod) => mod.SVGViewer
    );
  },
  { ssr: false }
);

interface TournamentBraketProps {
  singleEliminationBracketMatchs: Match[];
  containerSize?: { width: number; height: number };
}

export default function TournamentBraket({
  singleEliminationBracketMatchs,
  containerSize,
}: TournamentBraketProps) {
  const [, setHighLightUser] = useRecoilState(clickedTournamentState);
  if (singleEliminationBracketMatchs.length === 0)
    return <h1 style={{ color: 'white' }}>Loading...</h1>;
  // const [width, height] = useWindowSize();
  const finalWidth = containerSize?.width; //Math.max(width - 50, 500);
  const finalHeight = containerSize?.height; //Math.max(height - 100, 500);

  return (
    <SingleEliminationBracket
      matches={singleEliminationBracketMatchs}
      onPartyClick={(party: Participant, won: boolean) => {
        setHighLightUser(party.name);
      }}
      matchComponent={TournamentMatch}
      options={{
        style: {
          width: 230,
          boxHeight: 120,
          roundHeader: {
            isShown: false,
            fontColor: '#FFFFFF',
          },
          connectorColor: '#FFFFFF',
          connectorColorHighlight: '#da96c6',
        },
      }}
      svgWrapper={({ children, ...props }) => (
        <SVGViewer
          background={'rgba(0, 0, 0, 0)'}
          SVGBackground={'rgba(0, 0, 0, 0)'}
          width={finalWidth}
          height={finalHeight}
          {...props}
        >
          {children}
        </SVGViewer>
      )}
    />
  );
}
