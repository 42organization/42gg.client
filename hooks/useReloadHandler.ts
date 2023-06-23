import { Dispatch, SetStateAction } from 'react';
import { SetterOrUpdater } from 'recoil';

interface useReloadHanlderProps {
  setSpinReloadButton: Dispatch<SetStateAction<boolean>>;
  setState: null | SetterOrUpdater<boolean>;
  state: boolean;
}

const useReloadHandler = ({
  setSpinReloadButton,
  setState,
  state,
}: useReloadHanlderProps): (() => void) => {
  const reloadHandler = () => {
    setSpinReloadButton(true);
    setTimeout(() => {
      setSpinReloadButton(false);
    }, 1000);
    if (setState) {
      setState(state);
    }
  };
  return reloadHandler;
};

export default useReloadHandler;
