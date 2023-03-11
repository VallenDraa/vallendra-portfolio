import { IoLanguage } from "react-icons/io5";
import { Dispatch, SetStateAction } from "react";
import type { Language } from "types/types";
import StyledButton from "components/StyledComponents/StyledButton";

export default function LanguageToggle({
  activeLanguage,
  setActiveLanguage,
}: {
  activeLanguage: string;
  setActiveLanguage: Dispatch<SetStateAction<Language>>;
}) {
  return (
    <StyledButton
      alwaysShowIcon
      className="w-full border border-indigo-400 py-3 px-6 text-indigo-400 hover:bg-indigo-500/10 lg:w-max"
      icon={<IoLanguage />}
      color="indigo"
      onClick={() => setActiveLanguage(prev => (prev === "en" ? "id" : "en"))}
    >
      Read In {activeLanguage === "en" ? "Indonesian" : "English"}
    </StyledButton>
  );
}
