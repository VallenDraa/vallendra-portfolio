import { FC, ReactElement } from "react";

interface IProps {
  when: boolean;
  children: ReactElement[] | ReactElement | string | null;
}

const Show: FC<IProps> = ({ when, children }) => {
  return <>{when ? children : null}</>;
};

export default Show;
