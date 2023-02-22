import R from "react";

export type NavIsOpened = {
  navIsOpened: boolean;
  setNavIsOpened: R.Dispatch<R.SetStateAction<boolean>>;
};

export const navInitialState = {
  navIsOpened: false,
  setNavIsOpened() {},
};

const NavIsOpenedContext = R.createContext<NavIsOpened>(navInitialState);

export function NavIsOpenedCP({ children }: { children: R.ReactNode }) {
  const [navIsOpened, setNavIsOpened] = R.useState(false);

  const navOpenedValue = R.useMemo(
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
