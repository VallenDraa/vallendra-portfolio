import {
  ReactNode,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

export interface IntersectingProjectHistory {
  prevId: string | null;
  currentId: string | null;
}

export interface IntersectingProjectHistoryProvider {
  history: IntersectingProjectHistory;
  setHistory: Dispatch<SetStateAction<IntersectingProjectHistory>>;
}

const IntersectingProjectContext =
  createContext<IntersectingProjectHistoryProvider>({
    history: { prevId: null, currentId: null },
    setHistory: () => history,
  });

export function IntersectingProjectCP({ children }: { children: ReactNode }) {
  const [history, setHistory] = useState<IntersectingProjectHistory>({
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
