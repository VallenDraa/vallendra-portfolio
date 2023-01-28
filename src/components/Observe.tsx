import R from "react";
import useIntersectionObserver, {
  UseIntersectionObserverProps,
} from "../utils/client/hooks/useIntersectionObserver";
import { IS_PROD } from "../../constants";

interface Props<T extends HTMLElement> extends UseIntersectionObserverProps {
  children: React.ReactElement;
  onEnter?: (element: R.RefObject<T>) => void;
  onExit?: (element: R.RefObject<T>) => void;
}

function Observe<T extends HTMLElement>({
  children,
  onEnter,
  onExit,
  freezeOnceVisible,
  ...others
}: Props<T>) {
  const ref = R.useRef<T>(null);
  const entry = useIntersectionObserver(ref, {
    ...others,
    freezeOnceVisible: IS_PROD ? freezeOnceVisible : false,
  });

  R.useEffect(() => {
    if (entry?.isIntersecting) {
      onEnter && onEnter(ref);
    } else {
      onExit && onExit(ref);
    }
  }, [entry?.isIntersecting]);

  return R.cloneElement(children, { ref });
}

export default Observe;