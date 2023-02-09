import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
  useMemo,
} from "react";

export interface NavIsOpened {
  navIsOpened: boolean;
  setNavIsOpened: Dispatch<SetStateAction<boolean>>;
}

export const navInitialState = {
  navIsOpened: false,
  setNavIsOpened() {},
};

export const NavIsOpenedContext = createContext<NavIsOpened>(navInitialState);

export function NavIsOpenedCP({ children }: { children: ReactNode }) {
  const [navIsOpened, setNavIsOpened] = useState(false);

  const navOpenedValue = useMemo(
    () => ({ navIsOpened, setNavIsOpened }),
    [navIsOpened],
  );

  return (
    <NavIsOpenedContext.Provider value={navOpenedValue}>
      {children}
    </NavIsOpenedContext.Provider>
  );
}

export default NavIsOpenedContext;
