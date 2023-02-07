import React from "react";
import { technologies } from "../../types/types";
import techIcons from "../MappedComponents/TechIcons";

export default function TechsSection({ techs }: { techs: technologies[] }) {
  return (
    <ul className="mt-2.5 flex items-center gap-1 overflow-x-auto px-3">
      {techs.map((tech) => {
        return <li key={tech}>{techIcons[tech]("text-sm", false)}</li>;
      })}
    </ul>
  );
}
