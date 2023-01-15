import { useState } from "react";
import { useEffect } from "react";
import useDebounce from "../utils/hooks/useDebounce";
import { useRouter } from "next/router";
import { useRef } from "react";
import StyledInput from "./StyledComponents/StyledInput";
import { Input, InputProps } from "@material-tailwind/react";
import Show from "../utils/jsx/Show";
import { AiOutlineLoading } from "react-icons/ai";

interface IProps extends InputProps {
  queryKey?: string; // will default to find if not provided
  defaultValue?: string;
  debounceMs?: number;
  willRedirect: boolean; // will redirect to query url (ex. /projects?q=lorem)
  loadingCallback?: (isWaiting: boolean) => void;
  callback: (query: string) => void;
}

export default function SearchInput({
  ref,
  placeholder,
  disabled,
  ...props
}: IProps) {
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
    <StyledInput
      icon={
        <Show when={isWaitingResult}>
          <AiOutlineLoading className="animate-spin text-lg dark:text-gray-300" />
        </Show>
      }
      ref={inputRef}
      label={placeholder || ""}
      disabled={disabled || !!searchError}
      onChange={(e) => {
        if (props.onChange) props.onChange(e);

        setTempQuery(e.target.value);
      }}
      value={tempQuery}
      role="search"
      {...props}
    />
  );
}
