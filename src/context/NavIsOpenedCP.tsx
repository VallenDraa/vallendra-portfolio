import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

export interface INavIsOpened {
  navIsOpened: boolean;
  setNavIsOpened: Dispatch<SetStateAction<boolean>>;
}

export const navInitialState = {
  navIsOpened: false,
  setNavIsOpened() {},
};

export const NavIsOpenedContext = createContext<INavIsOpened>(navInitialState);

export function NavIsOpenedCP({ children }: { children: ReactNode }) {
  const [navIsOpened, setNavIsOpened] = useState(false);

  return (
    <NavIsOpenedContext.Provider value={{ navIsOpened, setNavIsOpened }}>
      {children}
    </NavIsOpenedContext.Provider>
  );
}

export default NavIsOpenedContext;
