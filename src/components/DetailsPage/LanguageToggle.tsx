import { IoLanguage } from "react-icons/io5";
import ActionButton from "../StyledComponents/ActionButton";
import { Language } from "../../types/types";
import { Dispatch, SetStateAction } from "react";

export default function LanguageToggle({
  activeLanguage,
  setActiveLanguage,
}: {
  activeLanguage: string;
  setActiveLanguage: Dispatch<SetStateAction<Language>>;
}) {
  return (
    <ActionButton
      className="w-full lg:w-max"
      icon={<IoLanguage />}
      color="teal"
      onClick={() => setActiveLanguage((prev) => (prev === "en" ? "id" : "en"))}
    >
      {activeLanguage === "en" ? "Read In Indonesian" : "Read In English"}
    </ActionButton>
  );
}
