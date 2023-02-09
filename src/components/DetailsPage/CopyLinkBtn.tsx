import R from "react";
import { AiOutlineCheck, AiOutlineClose, AiOutlineLink } from "react-icons/ai";
import Show from "../../utils/client/jsx/Show";
import ActionButton from "../StyledComponents/ActionButton";

export default function CopyLinkBtn() {
  const [shareIsSupported, setShareIsSupported] = R.useState<boolean | null>(
    null,
  );
  const [copyLinkIsSupported, setCopyLinkIsSupported] = R.useState<
    boolean | null
  >();

  const [hasBeenPressed, setHasBeenPressed] = R.useState(false);
  const [isError, setIsError] = R.useState(false);

  R.useEffect(() => setCopyLinkIsSupported(!!navigator.clipboard?.writeText));

  R.useEffect(() => setShareIsSupported(!!navigator.share), []);

  function copyLinkToClipBoard() {
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
  }

  function shareInfo() {
    navigator
      .share({
        title: globalThis.document.title,
        url: globalThis.window.location.href,
      })
      .then(() => setHasBeenPressed(true))
      .catch(() => {
        setIsError(true);
        setTimeout(() => setIsError(false), 1500);
      })
      .finally(() => setHasBeenPressed(false));
  }

  return (
    <>
      <Show when={copyLinkIsSupported === null && shareIsSupported === null}>
        <div className="h-9 w-full animate-pulse rounded bg-white/20 py-2 px-4 shadow-sm hover:shadow" />
      </Show>

      <Show when={copyLinkIsSupported === true && shareIsSupported === false}>
        <ActionButton
          className="animate-fade-in"
          onClick={copyLinkToClipBoard}
          color={isError ? "red" : "teal"}
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
        </ActionButton>
      </Show>

      <Show when={shareIsSupported === true}>
        <ActionButton
          disabled={hasBeenPressed}
          className="animate-fade-in"
          onClick={shareInfo}
          color={isError ? "red" : "teal"}
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
        </ActionButton>
      </Show>
    </>
  );
}
