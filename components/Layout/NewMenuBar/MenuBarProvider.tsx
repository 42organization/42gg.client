import { createContext } from 'react';
import { Resetter, SetterOrUpdater } from 'recoil';
import { MainMenu, SubMenu, AdminMenu } from './MenuBarElement';
import { useRecoilValue, useSetRecoilState, useResetRecoilState } from 'recoil';
import { seasonListState } from 'utils/recoil/seasons';
import { modalState } from 'utils/recoil/modal';
import { userState } from 'utils/recoil/layout';
import { openMenuBarState } from 'utils/recoil/layout';
import { SeasonList } from 'types/seasonTypes';
import { Modal } from 'types/modalTypes';

export interface NewMenuContextState {
  seasonMode: SeasonList;
  isAdmin: boolean;
  resetOpenMenuBar: Resetter;
  setModal: SetterOrUpdater<Modal>;
  intraId: string;
}

export const NewMenuContext = createContext<NewMenuContextState | null>(null);

const NewMenuStateContext = (props) => {
  const seasonMode = useRecoilValue(seasonListState);
  const { intraId, isAdmin } = useRecoilValue(userState);
  const resetOpenMenuBar = useResetRecoilState(openMenuBarState);
  const setModal = useSetRecoilState(modalState);

  const NewMenuState: NewMenuContextState = {
    seasonMode: seasonMode,
    isAdmin: isAdmin,
    intraId: intraId,
    resetOpenMenuBar: resetOpenMenuBar,
    setModal: setModal,
  };

  return (
    <NewMenuContext.Provider value={NewMenuState}>
      {props.children}
    </NewMenuContext.Provider>
  );
};

NewMenuStateContext.mainMenu = MainMenu;
NewMenuStateContext.subMenu = SubMenu;
NewMenuStateContext.AdminMenu = AdminMenu;

export default NewMenuStateContext;
