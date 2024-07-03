import { useRouter } from 'next/router';
import type { NextPage } from 'next';

const Index: NextPage = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/takgu');
  };

  return (
    <div>
      <h1>herererer</h1>
      <button onClick={handleClick}>Go to Pingpong</button>
    </div>
  );
};

export default Index;
