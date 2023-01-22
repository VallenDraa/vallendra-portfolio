import { FC, ReactNode } from "react";

interface Props {
  when: boolean;
  children: ReactNode[] | ReactNode | string | null;
}

const Show: FC<Props> = ({ when, children }) => {
  return <>{when ? children : null}</>;
};

export default Show;
