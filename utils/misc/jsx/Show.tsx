import { FC, Fragment, ReactElement } from "react";

interface IProps {
  when: boolean;
  children: ReactElement;
}

const Show: FC<IProps> = ({ when, children }) => {
  return <Fragment>{when ? children : null}</Fragment>;
};

export default Show;
