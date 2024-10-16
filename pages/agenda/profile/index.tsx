import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { agendaErrorState } from 'utils/recoil/agendaError';
import { useUser } from 'hooks/agenda/Layout/useUser';

const Index = () => {
  const router = useRouter();
  const { intraId } = useUser() || {};
  const setError = useSetRecoilState(agendaErrorState);

  useEffect(() => {
    if (intraId) {
      router.push(`/agenda/profile/user?id=${intraId}`);
    } else {
      setError({
        msg: '로그인 정보가 만료되어 재로그인이 필요합니다.',
        status: 401,
      });
    }
  }, [intraId, router, setError]);

  return null;
};

export default Index;
