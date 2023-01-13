import { FC, ReactNode } from "react";

interface IProps {
  when: boolean;
  children: ReactNode[] | ReactNode | string | null;
}

const Show: FC<IProps> = ({ when, children }) => {
  return <>{when ? children : null}</>;
};

export default Show;
