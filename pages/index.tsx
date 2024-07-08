import { useRouter } from 'next/router';
import type { NextPage } from 'next';

const Index: NextPage = () => {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div>
      <h1>herererer</h1>
      <button onClick={() => handleNavigation('/takgu')}>42gg</button>
      <button onClick={() => handleNavigation('/agenda')}>Agenda</button>
      <button onClick={() => handleNavigation('/outerMatch')}>
        Go to Outer match
      </button>
    </div>
  );
};

export default Index;
