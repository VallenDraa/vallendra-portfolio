import { FC, ReactElement } from "react";

interface IProps {
  when: boolean;
  children: ReactElement[] | ReactElement | null;
}

const Show: FC<IProps> = ({ when, children }) => {
  return <>{when ? children : null}</>;
};

export default Show;
