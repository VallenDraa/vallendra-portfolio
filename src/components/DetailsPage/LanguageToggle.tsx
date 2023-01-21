import { IoLanguage } from "react-icons/io5";
import ActionButton from "../StyledComponents/ActionButton";

export default function LanguageToggle({
  activeLanguage,
  cb,
}: {
  activeLanguage: string;
  cb: () => void;
}) {
  return (
    <ActionButton icon={<IoLanguage />} color="teal" onClick={cb}>
      {activeLanguage === "en" ? "Read In Indonesian" : "Read In English"}
    </ActionButton>
  );
}
