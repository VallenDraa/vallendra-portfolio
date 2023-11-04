import R from "react";

export type LightboxIsActive = {
  lightboxIsActive: boolean;
  setLightboxIsActive: R.Dispatch<R.SetStateAction<boolean>>;
};

export const navInitialState = {
  lightboxIsActive: false,
  setLightboxIsActive() {},
};

const LightboxIsActiveContext =
  R.createContext<LightboxIsActive>(navInitialState);

export function LightboxIsActiveCP({ children }: { children: R.ReactNode }) {
  const [lightboxIsActive, setLightboxIsActive] = R.useState(false);

  const lightboxActiveValue = R.useMemo(
    () => ({ lightboxIsActive, setLightboxIsActive }),
    [lightboxIsActive],
  );

  return (
    <LightboxIsActiveContext.Provider value={lightboxActiveValue}>
      {children}
    </LightboxIsActiveContext.Provider>
  );
}

export default LightboxIsActiveContext;
