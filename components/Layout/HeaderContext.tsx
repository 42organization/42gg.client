import React, { useState, createContext } from 'react';

export const HeaderContext = createContext();

const HeaderInfoContext = (props) => {
  const [menu, setMenu] = useState(false);
  const [noti, setNoti] = useState(false);

  const HeaderInfo = {
    menu,
    setMenu,
    noti,
    setNoti,
  };
  return (
    <HeaderContext.Provider value={HeaderInfo}>
      {props.children}
    </HeaderContext.Provider>
  );
};

export default HeaderInfoContext;
