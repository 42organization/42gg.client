import { useRouter } from 'next/router';

export const usePathname = () => {
  const presentPath = useRouter().pathname;
  return presentPath.split('/')[1];
};
