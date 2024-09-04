import { useRouter } from 'next/router';
import { useUser } from 'hooks/agenda/Layout/useUser';

const Index = () => {
  const router = useRouter();
  const { intraId } = useUser() || {};
  router.push(`/agenda/profile/user?id=${intraId}`);
};

export default Index;
