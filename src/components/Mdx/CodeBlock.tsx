import { useRef } from "react";
import useCopyToClipboard from "utils/client/hooks/useCopyToClipboard";
import StyledButton from "components/StyledComponents/StyledButton";
import { HiCheckCircle, HiClipboard } from "react-icons/hi";

export function Pre({
  children,
  ...props
}: React.ComponentPropsWithRef<"pre">) {
  return (
    <pre {...props} style={{ position: "relative", paddingTop: "2.5rem" }}>
      {children}
    </pre>
  );
}

export default function CustomCode({
  className,
  children,
  ...props
}: React.ComponentPropsWithRef<"code">) {
  const textRef = useRef<HTMLDivElement>(null);

  const [copy, copyIsSupported, hasBeenCopied] = useCopyToClipboard();

  const language = className?.includes("language")
    ? className.replace("language-", "").replace(" code-highlight", "")
    : null;

  return (
    <code {...props} data-code-type={language && "code-block"}>
      {language ? (
        <div ref={textRef} className="overflow-x-auto">
          {children}
        </div>
      ) : (
        <span>{children}</span>
      )}

      {language && (
        <span className="absolute left-6 top-0 block rounded-b-md border border-t-0 border-zinc-600 px-3 py-1 font-medium text-indigo-400">
          {language}
        </span>
      )}

      {language && (
        <StyledButton
          className="absolute right-2 top-2 rounded border border-zinc-600 !p-2 transition-colors hover:bg-zinc-700"
          onClick={() => copy(textRef?.current?.textContent ?? "")}
        >
          {hasBeenCopied ? (
            <HiCheckCircle className="text-indigo-400" />
          ) : (
            <HiClipboard />
          )}
        </StyledButton>
      )}
    </code>
  );
}
