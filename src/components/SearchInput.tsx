import { InputHTMLAttributes } from "react";
import Show from "../utils/jsx/Show";
import { AiOutlineLoading } from "react-icons/ai";
import { useState } from "react";
import { useEffect } from "react";
import useDebounce from "../utils/hooks/useDebounce";
import { useRouter } from "next/router";
import { useRef } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  queryKey?: string; // will default to find if not provided
  defaultValue?: string;
  debounceMs?: number;
  willRedirect: boolean; // will redirect to query url (ex. /projects?q=lorem)
  loadingCallback?: (isWaiting: boolean) => void;
  callback: (query: string) => void;
}

export default function SearchInput(props: IProps) {
  const DEFAULT_QUERY_KEY = "find";

  const router = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);

  const [tempQuery, setTempQuery] = useState(props.defaultValue || "");
  const [finalQuery, setFinalQuery] = useState(props.defaultValue || "");
  const [isWaitingResult, searchError] = useDebounce(
    () => setFinalQuery(tempQuery),
    props.debounceMs || 600,
    [tempQuery]
  );

  /* will trigger everytime isWaitingResult changes */
  useEffect(() => {
    if (props.loadingCallback) props.loadingCallback(isWaitingResult);
  }, [isWaitingResult]);

  /* will call the callback and redirect to the query url if told to
  ================================================================= */
  useEffect(() => {
    const redirectURL = finalQuery
      ? `${router.pathname}?${
          props.queryKey || DEFAULT_QUERY_KEY
        }=${finalQuery}`
      : router.pathname;

    props.callback(finalQuery);

    if (props.willRedirect) {
      router?.push(redirectURL, undefined, { shallow: true });
    }
  }, [finalQuery]);

  /* will trigger everytime the query url changes
  ================================================================= */
  useEffect(() => {
    const query = router.query[props.queryKey || DEFAULT_QUERY_KEY];

    setTempQuery((query as string) || "");
    setFinalQuery((query as string) || "");
  }, [router.query[props.queryKey || DEFAULT_QUERY_KEY]]);

  return (
    <div className="relative">
      <input
        ref={inputRef}
        disabled={props.disabled || !!searchError}
        onChange={(e) => {
          if (props.onChange) props.onChange(e);

          setTempQuery(e.target.value);
        }}
        value={tempQuery}
        role="search"
        type="text"
        placeholder={
          searchError
            ? "Fail to search, please try again later !"
            : props.placeholder
        }
        className={`h-12 w-full rounded-lg px-4 text-lg outline-none transition-colors disabled:cursor-not-allowed dark:bg-gray-800/70 dark:text-gray-300 dark:focus:bg-gray-800 dark:disabled:bg-gray-700 dark:disabled:hover:bg-gray-800 ${
          props.className || ""
        }`}
        style={props.style}
      />

      <Show when={isWaitingResult}>
        <AiOutlineLoading className="absolute right-4 top-1/3 animate-spin text-lg dark:text-gray-300" />
      </Show>
    </div>
  );
}
