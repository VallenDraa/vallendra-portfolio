import { ReactNode, RefObject, createContext, useRef } from "react";

interface IDashboardControllerContext {
  hideDashboard: () => void;
  openDashboard: () => void;
  dashboardRef: RefObject<HTMLDivElement> | null;
}

export const DashboardControllerContext =
  createContext<IDashboardControllerContext>({
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
    dashboardRef.current?.classList.remove("opacity-0");
  }

  function hideDashboard() {
    dashboardRef.current?.classList.add("opacity-0");
  }

  return (
    <DashboardControllerContext.Provider
      value={{ hideDashboard, openDashboard, dashboardRef }}
    >
      {children}
    </DashboardControllerContext.Provider>
  );
}
