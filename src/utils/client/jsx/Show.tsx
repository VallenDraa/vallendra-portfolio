import { ReactNode } from "react";

interface Props {
  when: boolean;
  children: ReactNode;
}

export default function Show({ when, children }: Props) {
  return when ? <> {children} </> : null;
}
