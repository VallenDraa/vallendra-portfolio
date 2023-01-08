import { createContext, useState, Dispatch, SetStateAction } from "react";

export interface IIntersectingProjectHistory {
  prevId: string | null;
  currentId: string | null;
}

export interface IIntersectingProjectHistoryProvider {
  history: IIntersectingProjectHistory;
  setHistory: Dispatch<SetStateAction<IIntersectingProjectHistory>>;
}

const IntersectingProjectContext =
  createContext<IIntersectingProjectHistoryProvider | null>({
    history: { prevId: null, currentId: null },
    setHistory: () => history,
  });

export function IntersectingProjectCP({ children }: { children: JSX.Element }) {
  const [history, setHistory] = useState<IIntersectingProjectHistory>({
    prevId: null,
    currentId: null,
  });

  return (
    <IntersectingProjectContext.Provider value={{ history, setHistory }}>
      {children}
    </IntersectingProjectContext.Provider>
  );
}

export default IntersectingProjectContext;
