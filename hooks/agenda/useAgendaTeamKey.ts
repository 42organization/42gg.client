import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const useAgendaTeamKey = () => {
  const router = useRouter();
  const [teamKey, setTeamKey] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (router.isReady) {
      const key = router.query.team_key as string;
      setTeamKey(key || 'no-team'); // 팀 키가 없으면 'no-team' 반환
    }
  }, [router.isReady, router.query.agenda_key]);

  return teamKey;
};

export default useAgendaTeamKey;
