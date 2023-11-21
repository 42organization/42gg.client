import dynamic from 'next/dynamic';
import { createTheme } from '@g-loot/react-tournament-brackets';
import { Match } from '@g-loot/react-tournament-brackets/dist/src/types';
import React from 'react';
import TournamentMatch from 'components/tournament/TournamentMatch';

if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
  import('@g-loot/react-tournament-brackets');
}

const SingleEliminationBracket = dynamic(
  () => {
    return import('@g-loot/react-tournament-brackets').then(
      (mod) => mod.SingleEliminationBracket
    );
  },
  { ssr: false }
);

const SVGViewer = dynamic(
  () => {
    return import('@g-loot/react-tournament-brackets').then(
      (mod) => mod.SVGViewer
    );
  },
  { ssr: false }
);

interface TournamentBraketProps {
  singleEliminationBracketMatchs: Match[];
}

export default function TournamentBraket({
  singleEliminationBracketMatchs,
}: TournamentBraketProps) {
  // const [width, height] = useWindowSize();
  const finalWidth = 500; //Math.max(width - 50, 500);
  const finalHeight = 500; //Math.max(height - 100, 500);

  return (
    // <>
    //   <h1></h1>
    // </>
    <SingleEliminationBracket
      matches={singleEliminationBracketMatchs}
      matchComponent={TournamentMatch}
      options={{
        style: {
          roundHeader: {
            backgroundColor: '#AAA',
            fontColor: '#FFFFFF',
          },
          connectorColor: '#000000',
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
