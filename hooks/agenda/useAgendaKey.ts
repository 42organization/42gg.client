import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const useAgendaKey = () => {
  const router = useRouter();
  const [agendaKey, setAgendaKey] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (router.isReady) {
      const key = router.query.agenda_key as string;
      setAgendaKey(key);
    }
  }, [router.isReady, router.query.agenda_key]);

  return agendaKey;
};

export default useAgendaKey;
