import { ReactNode } from "react";

type ShowProps = {
  when: boolean;
  children: ReactNode;
};

export default function Show({ when, children }: ShowProps) {
  return when ? <> {children} </> : null;
}
