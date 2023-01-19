import { useState } from "react";
import { useEffect } from "react";
import useDebounce from "../utils/hooks/useDebounce";
import { useRouter } from "next/router";
import StyledInput from "./StyledComponents/StyledInput";
import { InputProps } from "@material-tailwind/react";
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

const DEFAULT_QUERY_KEY = "find";

export default function SearchInput({
  ref,
  placeholder,
  disabled,
  queryKey,
  defaultValue,
  debounceMs,
  willRedirect,
  loadingCallback,
  callback,
  onChange,
  ...props
}: IProps) {
  const router = useRouter();

  const [tempQuery, setTempQuery] = useState(defaultValue || "");
  const [finalQuery, setFinalQuery] = useState(defaultValue || "");
  const [isWaitingResult, searchError] = useDebounce(
    () => setFinalQuery(tempQuery),
    debounceMs || 600,
    [tempQuery]
  );

  /* will trigger everytime isWaitingResult changes */
  useEffect(() => {
    if (loadingCallback) loadingCallback(isWaitingResult);
  }, [isWaitingResult]);

  /* will call the callback and redirect to the query url if told to
  ================================================================= */
  useEffect(() => {
    const redirectURL = finalQuery
      ? `${router.pathname}?${queryKey || DEFAULT_QUERY_KEY}=${finalQuery}`
      : router.pathname;

    callback(finalQuery);

    if (willRedirect) {
      router?.push(redirectURL, undefined, { shallow: true });
    }
  }, [finalQuery]);

  /* will trigger everytime the query url changes
  ================================================================= */
  useEffect(() => {
    const query = router.query[queryKey || DEFAULT_QUERY_KEY];

    setTempQuery((query as string) || "");
    setFinalQuery((query as string) || "");
  }, [router.query[queryKey || DEFAULT_QUERY_KEY]]);

  return (
    <StyledInput
      icon={
        <Show when={isWaitingResult}>
          <AiOutlineLoading className="animate-spin text-lg dark:text-gray-300" />
        </Show>
      }
      label={placeholder || ""}
      disabled={disabled || !!searchError}
      onChange={(e) => {
        if (onChange) onChange(e);

        setTempQuery(e.target.value);
      }}
      value={tempQuery}
      role="search"
      {...props}
    />
  );
}
