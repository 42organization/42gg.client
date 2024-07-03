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
import { useSetRecoilState } from 'recoil';
import { clickedTournamentState } from 'utils/recoil/tournament';
import TournamentMatch from 'components/takgu/tournament/TournamentMatch';
import LoadingSpinner from 'components/takgu/UI/LoadingSpinner';

if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
  import('@g-loot/react-tournament-brackets');
}

const SingleEliminationBracket = dynamic<
  React.ComponentProps<typeof StaticSingleEliminationBracket>
>(
  async () => {
    return import('@g-loot/react-tournament-brackets').then(
      (mod) => mod.SingleEliminationBracket
    );
  },
  { ssr: false }
);

const SVGViewer = dynamic<React.ComponentProps<typeof StaticSVGViewer>>(
  async () => {
    return import('@g-loot/react-tournament-brackets').then(
      (mod) => mod.SVGViewer
    );
  },
  { ssr: false }
);

interface TournamentBraketProps {
  singleEliminationBracketMatchs: Match[];
  containerSize: { width: number | undefined; height: number | undefined };
}

export default function TournamentBraket({
  singleEliminationBracketMatchs,
  containerSize,
}: TournamentBraketProps) {
  const setHighLightUser = useSetRecoilState(clickedTournamentState);

  if (singleEliminationBracketMatchs.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <SingleEliminationBracket
      matches={singleEliminationBracketMatchs}
      onPartyClick={(party: Participant, won: boolean) => {
        if (party.name !== '') {
          setHighLightUser(party.name);
        }
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
