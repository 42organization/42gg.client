import dynamic from 'next/dynamic';
import {
  SVGViewer as StaticSVGViewer,
  SingleEliminationBracket as StaticSingleEliminationBracket,
} from '@g-loot/react-tournament-brackets';
import { Match } from '@g-loot/react-tournament-brackets/dist/src/types';
import React from 'react';
import TournamentEditMatch from './TournamentEditMatch';

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

interface TournamentEditBraketProps {
  singleEliminationBracketMatchs: Match[];
  containerSize: { width: number | undefined; height: number | undefined };
}

export default function TournamentEditBraket({
  singleEliminationBracketMatchs,
  containerSize,
}: TournamentEditBraketProps) {
  if (singleEliminationBracketMatchs.length === 0) {
    return <h1 style={{ color: 'white' }}>Loading...</h1>;
  }

  return (
    <SingleEliminationBracket
      matches={singleEliminationBracketMatchs}
      matchComponent={TournamentEditMatch}
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
          width={containerSize.width}
          height={containerSize.height}
          {...props}
        >
          {children}
        </SVGViewer>
      )}
    />
  );
}
