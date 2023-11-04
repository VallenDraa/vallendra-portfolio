import { Dispatch, SetStateAction } from "react";

type AlertHandlerArgs = {
  setShowAlert: Dispatch<SetStateAction<boolean>>;
  onShow?: () => void;
  onHide?: () => void;
  showDelay?: number;
  showDuration?: number;
};

export default function alertHandler({
  setShowAlert,
  onShow,
  onHide,
  showDelay = 0,
  showDuration = 4000,
}: AlertHandlerArgs) {
  setTimeout(() => {
    if (onShow) onShow();
    setShowAlert(true);
  }, showDelay);

  setTimeout(() => {
    if (onHide) onHide();
    setShowAlert(false);
  }, showDuration);
}
