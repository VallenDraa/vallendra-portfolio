import { useEffect } from "react";
import { AiOutlineCheck, AiOutlineClose, AiOutlineLink } from "react-icons/ai";
import Show from "utils/client/jsx/Show";
import StyledButton from "components/StyledComponents/StyledButton";
import clsx from "clsx";
import useCopyToClipboard from "utils/client/hooks/useCopyToClipboard";
import useShareInfo from "utils/client/hooks/useShareInfo";

export default function CopyLinkBtn() {
  const {
    copy,
    isLoading: copyIsLoading,
    isSupported: copyIsSupported,
    hasBeenPressed: hasBeenCopied,
    isError: hasCopyError,
  } = useCopyToClipboard();

  const {
    share,
    isLoading: shareIsLoading,
    isSupported: shareIsSupported,
    hasBeenPressed: hasBeenShared,
    isError: hasSharingError,
  } = useShareInfo();

  /* Handle Error
  =============== */
  useEffect(() => {}, [hasCopyError, hasSharingError]);

  return copyIsLoading && shareIsLoading ? (
    <div className="h-9 w-full animate-pulse rounded bg-white/20 px-4 py-2 shadow-sm hover:shadow" />
  ) : (
    <>
      {/* copy link to clipboard */}
      <Show when={copyIsSupported && !shareIsSupported}>
        <StyledButton
          alwaysShowIcon
          className={clsx(
            "w-full animate-fade-in border px-6 py-3",
            hasCopyError
              ? "border-red-500 text-red-500 hover:bg-red-500/10"
              : "border-teal-500 text-teal-500 hover:bg-teal-500/10",
          )}
          onClick={() => copy(window.location.href)}
          icon={
            <>
              <Show when={!hasBeenCopied && !hasCopyError}>
                <AiOutlineLink className="text-teal-500" />
              </Show>

              {/* content for pressed and errorless state */}
              <Show when={hasBeenCopied && !hasCopyError}>
                <AiOutlineCheck />
              </Show>

              <Show when={hasBeenCopied && hasCopyError}>
                <AiOutlineClose />
              </Show>
            </>
          }
        >
          {/* content for  unpressed state  */}
          <Show when={!hasBeenCopied && !hasCopyError}>Copy Link</Show>

          {/* content for pressed and errorless state */}
          <Show when={hasBeenCopied && !hasCopyError}>Link Copied !</Show>

          {/* content for pressed and has error state */}
          <Show when={hasCopyError}>Fail To Copy !</Show>
        </StyledButton>
      </Show>

      {/* share page  */}
      <Show when={shareIsSupported}>
        <StyledButton
          alwaysShowIcon
          disabled={hasBeenShared}
          onClick={() =>
            share({
              title: globalThis.document.title,
              url: globalThis.window.location.href,
            })
          }
          className={clsx(
            "w-full animate-fade-in border px-6 py-3",
            hasSharingError
              ? "border-red-500 text-red-500 hover:bg-red-500/10"
              : "border-teal-500 text-teal-500 hover:bg-teal-500/10",
          )}
          icon={
            <>
              <Show when={!hasBeenShared && !hasSharingError}>
                <AiOutlineLink className="text-teal-500" />
              </Show>

              <Show when={hasSharingError}>
                <AiOutlineClose />
              </Show>
            </>
          }
        >
          {/* content for  unpressed state  */}
          <Show when={!hasBeenShared && !hasSharingError}>Share Page</Show>

          {/* content for pressed and has error state */}
          <Show when={hasSharingError}>Fail To Share !</Show>
        </StyledButton>
      </Show>
    </>
  );
}
