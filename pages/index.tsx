import Link from 'next/link';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
// import Searchbar from '../components/main/Searchbar';
import Section from '../components/main/Section';
import { Game } from '../types/gameTypes';
import { Rank } from '../types/rankTypes';
import { getData } from '../utils/axios';
import styles from '../styles/Home.module.scss';

const Home: NextPage = () => {
  const [gameData, setGameData] = useState<Game[] | null>(null);
  const [rankData, setRankData] = useState<Rank[] | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const mainGmaeData = await getData(`/pingpong/games`);
        const mainRankData = await getData(`/pingpong/ranks/${1}?count=20`);
        setRankData(mainRankData.rankList.slice(0, 3));
        setGameData(mainGmaeData.slice(0, 3));
        // api가 완성되지 않아 랭크, 게임 데이터에서 임시로 3개를 자릅니다.
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  if (!gameData || !rankData) return <div>loading...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.search}>{/* <Searchbar /> */}</div>
      <div className={styles.game}>
        <Section gameData={gameData} path={'/game'} />
      </div>
      <div className={styles.rank}>
        <Section rankData={rankData} path={'/rank'} />
      </div>
    </div>
  );
};

export default Home;
