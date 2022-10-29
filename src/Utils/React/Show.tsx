import { FC, ReactElement } from "react";

interface IProps {
  when: boolean;
  children: ReactElement;
}

const Show: FC<IProps> = ({ when, children }) => {
  return <>{when && children}</>;
};

export default Show;
