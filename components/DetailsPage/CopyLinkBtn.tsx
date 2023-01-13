import { Button } from "@material-tailwind/react";
import { useState } from "react";
import Show from "../../utils/jsx/Show";
import {
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineGlobal,
  AiOutlineLink,
} from "react-icons/ai";
import ActionButton from "./ActionButton";

export default function CopyLinkBtn() {
  const [hasBeenPressed, setHasBeenPressed] = useState(false);
  const [isError, setIsError] = useState(false);

  function copyLinkToClipBoard() {
    setIsError(false);

    try {
      navigator.clipboard.writeText(window.location.href);
      setHasBeenPressed(true);

      setTimeout(() => setHasBeenPressed(false), 1500);
    } catch (e) {
      setIsError(true);
    }
  }

  return (
    <ActionButton
      onClick={copyLinkToClipBoard}
      variant={"outlined"}
      color={isError ? "red" : "green"}
      className="flex justify-center"
    >
      {/* content for  unpressed state  */}
      <Show when={!hasBeenPressed}>
        <AiOutlineLink className="text-green-500" />
        <span>Copy Link</span>
      </Show>

      {/* content for pressed and errorless state */}
      <Show when={hasBeenPressed && !isError}>
        <AiOutlineCheck />
        <span>Link Copied !</span>
      </Show>

      {/* content for pressed and has error state */}
      <Show when={hasBeenPressed && isError}>
        <AiOutlineClose />
        <span>Fail To Copy !</span>
      </Show>
    </ActionButton>
  );
}
