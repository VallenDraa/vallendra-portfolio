import { useEffect, useState, useCallback } from "react";
import { AiOutlineCheck, AiOutlineClose, AiOutlineLink } from "react-icons/ai";
import Show from "utils/client/jsx/Show";
import StyledButton from "components/StyledComponents/StyledButton";
import clsx from "clsx";

export default function CopyLinkBtn() {
  const [shareIsSupported, setShareIsSupported] = useState<boolean | null>(
    null,
  );
  const [copyLinkIsSupported, setCopyLinkIsSupported] = useState<
    boolean | null
  >(null);

  const [hasBeenPressed, setHasBeenPressed] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => setCopyLinkIsSupported(!!navigator.clipboard?.writeText), []);

  useEffect(() => setShareIsSupported(!!navigator.share), []);

  const copyLinkToClipBoard = useCallback(() => {
    navigator.clipboard
      ?.writeText(window.location.href)
      .then(() => {
        setHasBeenPressed(true);
        setTimeout(() => setHasBeenPressed(false), 1500);
      })
      .catch(() => {
        setIsError(true);
        setTimeout(() => setIsError(false), 1500);
      });
  }, []);

  const shareInfo = useCallback(() => {
    navigator
      .share({
        title: globalThis.document.title,
        url: globalThis.window.location.href,
      })
      .then(() => setHasBeenPressed(true))
      .catch(error => {
        if (error.name === "AbortError") return;

        setIsError(true);
        setTimeout(() => setIsError(false), 1500);
      })
      .finally(() => setHasBeenPressed(false));
  }, []);

  return (
    <>
      <Show when={copyLinkIsSupported === null && shareIsSupported === null}>
        <div className="h-9 w-full animate-pulse rounded bg-white/20 py-2 px-4 shadow-sm hover:shadow" />
      </Show>

      <Show when={copyLinkIsSupported === true && shareIsSupported === false}>
        <StyledButton
          alwaysShowIcon
          className={clsx(
            "w-full animate-fade-in border py-3 px-6",
            isError
              ? "border-red-500 text-red-500 hover:bg-red-500/10"
              : "border-teal-500 text-teal-500 hover:bg-teal-500/10",
          )}
          onClick={copyLinkToClipBoard}
          icon={
            <>
              <Show when={!hasBeenPressed && !isError}>
                <AiOutlineLink className="text-teal-500" />
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
          <Show when={!hasBeenPressed && !isError}>Copy Link</Show>

          {/* content for pressed and errorless state */}
          <Show when={hasBeenPressed && !isError}>Link Copied !</Show>

          {/* content for pressed and has error state */}
          <Show when={isError}>Fail To Copy !</Show>
        </StyledButton>
      </Show>

      <Show when={shareIsSupported === true}>
        <StyledButton
          alwaysShowIcon
          disabled={hasBeenPressed}
          onClick={shareInfo}
          className={clsx(
            "w-full animate-fade-in border py-3 px-6",
            isError
              ? "border-red-500 text-red-500 hover:bg-red-500/10"
              : "border-teal-500 text-teal-500 hover:bg-teal-500/10",
          )}
          icon={
            <>
              <Show when={!hasBeenPressed && !isError}>
                <AiOutlineLink className="text-teal-500" />
              </Show>

              <Show when={isError}>
                <AiOutlineClose />
              </Show>
            </>
          }
        >
          {/* content for  unpressed state  */}
          <Show when={!hasBeenPressed && !isError}>Share Page</Show>

          {/* content for pressed and has error state */}
          <Show when={isError}>Fail To Share !</Show>
        </StyledButton>
      </Show>
    </>
  );
}
