import R from "react";
import useIntersectionObserver, {
  UseIntersectionObserverProps,
} from "utils/client/hooks/useIntersectionObserver";
import { IS_PROD } from "@/constants";

type ObserveProps<T extends HTMLElement> = {
  children: React.ReactElement;
  onEnter?: (element: R.RefObject<T>) => void;
  onExit?: (element: R.RefObject<T>) => void;
  onIntersectingStatusChange?: (
    isIntersecting: boolean,
    element: R.RefObject<T>,
  ) => void;
} & UseIntersectionObserverProps;

export default function Observe<T extends HTMLElement>({
  children,
  onEnter,
  onExit,
  onIntersectingStatusChange,
  freezeOnceVisible,
  ...others
}: ObserveProps<T>) {
  const ref = R.useRef<T>(null);
  const entry = useIntersectionObserver(ref, {
    ...others,
    freezeOnceVisible: IS_PROD ? false : freezeOnceVisible,
  });

  R.useEffect(() => {
    if (onIntersectingStatusChange) {
      onIntersectingStatusChange(entry?.isIntersecting ?? false, ref);
    }

    if (entry?.isIntersecting) {
      if (onEnter) onEnter(ref);
    }

    if (!entry?.isIntersecting) {
      if (onExit) onExit(ref);
    }
  }, [entry?.isIntersecting]);

  return R.cloneElement(children, { ref });
}
