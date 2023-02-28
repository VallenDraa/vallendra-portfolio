import { IoLanguage } from "react-icons/io5";
import { Dispatch, SetStateAction } from "react";
import ActionButton from "components/StyledComponents/ActionButton";
import type { Language } from "types/types";

export default function LanguageToggle({
  activeLanguage,
  setActiveLanguage,
}: {
  activeLanguage: string;
  setActiveLanguage: Dispatch<SetStateAction<Language>>;
}) {
  return (
    <ActionButton
      className="w-full !border-indigo-400 !text-indigo-400 lg:w-max"
      icon={<IoLanguage />}
      color="indigo"
      onClick={() => setActiveLanguage(prev => (prev === "en" ? "id" : "en"))}
    >
      Read In {activeLanguage === "en" ? "Indonesian" : "English"}
    </ActionButton>
  );
}
