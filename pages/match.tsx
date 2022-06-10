import { useEffect, useState } from 'react';
import MatchBoardList from '../components/match/MatchBoardList';
import { MatchData } from '../types/matchTypes';
import { getData } from '../utils/axios';
import MatchEnrollModal from '../components/match/MatchEnrollModal';
import CurrentMatchInfo from '../components/match/CurrentMatchInfo';

export default function Match() {
  return (
    <div>
      <CurrentMatchInfo />
      <MatchBoardList type='single' />
      <MatchEnrollModal />
    </div>
  );
}
