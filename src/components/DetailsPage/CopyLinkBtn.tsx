import { Button } from "@material-tailwind/react";
import { useState } from "react";
import Show from "../../utils/jsx/Show";
import {
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineGlobal,
  AiOutlineLink,
} from "react-icons/ai";
import ActionButton from "../StyledComponents/ActionButton";

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
      color={isError ? "red" : "green"}
      icon={
        <>
          <Show when={!hasBeenPressed}>
            <AiOutlineLink className="text-green-500" />
          </Show>

          {/* content for pressed and errorless state */}
          <Show when={hasBeenPressed && !isError}>
            <AiOutlineCheck />
          </Show>

          <Show when={hasBeenPressed && isError}>
            <AiOutlineClose />
          </Show>
        </>
      }
    >
      {/* content for  unpressed state  */}
      <Show when={!hasBeenPressed}>Copy Link</Show>

      {/* content for pressed and errorless state */}
      <Show when={hasBeenPressed && !isError}>Link Copied !</Show>

      {/* content for pressed and has error state */}
      <Show when={hasBeenPressed && isError}>Fail To Copy !</Show>
    </ActionButton>
  );
}
