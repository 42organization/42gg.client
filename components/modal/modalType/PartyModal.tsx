import { useRecoilValue } from 'recoil';
import { modalState } from 'utils/recoil/modal';

export default function PartyModal() {
  const { modalName } = useRecoilValue(modalState);

  const content: { [key: string]: JSX.Element | null } = {};

  if (!modalName) return null;
  return content[modalName];
}
