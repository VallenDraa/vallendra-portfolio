import { useState, useEffect } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import useDebounce from "utils/client/hooks/useDebounce";
import Show from "utils/client/jsx/Show";
import StyledInput, { StyledInputProps } from "./StyledComponents/StyledInput";

type SearchInputProps = {
  defaultValue?: string;
  debounceMs?: number;
  loadingCallback?: (isWaiting: boolean) => void;
  callback: (query: string) => void;
} & Omit<StyledInputProps, "icon">;

export default function SearchInput({
  ref,
  placeholder,
  disabled,
  defaultValue,
  debounceMs = 600,
  loadingCallback,
  callback,
  onChange,
  ...props
}: SearchInputProps) {
  const [tempQuery, setTempQuery] = useState(defaultValue || "");
  const [finalQuery, setFinalQuery] = useState(defaultValue || "");
  const [isWaitingResult, searchError] = useDebounce(
    () => setFinalQuery(tempQuery),
    debounceMs,
    [tempQuery],
  );

  /* will trigger everytime isWaitingResult changes 
  ================================================================= */
  useEffect(() => {
    if (loadingCallback) loadingCallback(isWaitingResult);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isWaitingResult]);

  /* will call the callback everytime final query changes
  ================================================================= */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => callback(finalQuery), [finalQuery]);

  return (
    <StyledInput
      {...props}
      icon={
        <Show when={isWaitingResult}>
          <AiOutlineLoading className="animate-spin text-lg text-indigo-700 dark:text-zinc-300" />
        </Show>
      }
      aria-label={placeholder || ""}
      placeholder={placeholder || ""}
      disabled={disabled || !!searchError}
      onChange={e => {
        if (onChange) onChange(e);

        setTempQuery(e.target.value);
      }}
      value={tempQuery}
      role="search"
    />
  );
}
