import type { NextPage } from 'next';
import SearchBar from 'components/takgu/main/SearchBar';
import Section from 'components/takgu/main/Section';
import useBeforeLiveTournamentData from 'hooks/takgu/tournament/useBeforeLiveTournamentData';
import styles from 'styles/takgu/main/Home.module.scss';

const Home: NextPage = () => {
  const { data: tournamentData } = useBeforeLiveTournamentData();

  return (
    <div className={styles.container}>
      <SearchBar />
      {tournamentData &&
        (tournamentData.beforeTournament?.length > 0 ||
          tournamentData.liveTournament?.length > 0) && (
          <Section path='tournament' sectionTitle={'Tournament'} />
        )}
      <Section path='party' sectionTitle={'Party'} />
      <Section path='rank' sectionTitle={'Ranking'} />
      <Section path='game' sectionTitle={'Current Play'} />
    </div>
  );
};

export default Home;
