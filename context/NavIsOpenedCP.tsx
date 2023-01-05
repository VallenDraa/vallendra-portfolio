import { createContext, useState, Dispatch, SetStateAction } from "react";

export interface INavIsOpened {
  navIsOpened: boolean;
  setNavIsOpened: Dispatch<SetStateAction<boolean>>;
}

export const navInitialState = {
  navIsOpened: false,
  setNavIsOpened() {},
};

const NavIsOpenedContext = createContext<INavIsOpened | null>(navInitialState);

export function NavIsOpenedCP({ children }: { children: JSX.Element }) {
  const [navIsOpened, setNavIsOpened] = useState(false);

  return (
    <NavIsOpenedContext.Provider value={{ navIsOpened, setNavIsOpened }}>
      {children}
    </NavIsOpenedContext.Provider>
  );
}

export default NavIsOpenedContext;
