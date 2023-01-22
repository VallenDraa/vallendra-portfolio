import { ReactNode, RefObject, createContext, useRef } from "react";

interface DashboardController {
  hideDashboard: () => void;
  openDashboard: () => void;
  dashboardRef: RefObject<HTMLDivElement> | null;
}

export const DashboardControllerContext = createContext<DashboardController>({
  hideDashboard: () => {},
  openDashboard: () => {},
  dashboardRef: null,
});

export default function DashboardControllerProvider({
  children,
}: {
  children: ReactNode;
}) {
  const dashboardRef = useRef<HTMLDivElement>(null);

  /* Dashboard visibility controller function
  =========================================== */
  function openDashboard() {
    dashboardRef.current?.classList.add("-translate-y-1/2");
  }

  function hideDashboard() {
    dashboardRef.current?.classList.remove("-translate-y-1/2");
  }

  return (
    <DashboardControllerContext.Provider
      value={{ hideDashboard, openDashboard, dashboardRef }}
    >
      {children}
    </DashboardControllerContext.Provider>
  );
}
