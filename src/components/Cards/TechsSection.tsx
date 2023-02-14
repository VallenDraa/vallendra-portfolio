import techIcons from "components/MappedComponents/TechIcons";
import React from "react";
import { Technologies } from "types/types";

export default function TechsSection({ techs }: { techs: Technologies[] }) {
  return (
    <ul className="mt-2.5 flex items-center gap-1 overflow-x-auto px-3">
      {techs.map(tech => (
        <li key={tech}>{techIcons[tech]("text-sm", false)}</li>
      ))}
    </ul>
  );
}
