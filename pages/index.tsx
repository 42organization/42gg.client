import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import styles from 'styles/index.module.scss';
const Index: NextPage = () => {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className={styles.layout}>
      <div className={styles.flex}>
        <div className={styles.container}> GG </div>
        <div className={styles.container}> 다른거 </div>
      </div>

      <button onClick={() => handleNavigation('/takgu')}>42gg</button>
      <button onClick={() => handleNavigation('/agenda')}>Agenda</button>
      <button onClick={() => handleNavigation('/outerMatch')}>
        Go to Outer match
      </button>
    </div>
  );
};

export default Index;
