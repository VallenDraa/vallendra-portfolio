import { useTheme } from "next-themes";
import Image from "next/image";
import R, { useEffect } from "react";
import darkLayeredWave from "@/public/svg/dark-layered-wave.svg";
import lightLayeredWave from "@/public/svg/light-layered-wave.svg";
import Observe from "components/Observe";
import fadeIn from "utils/client/helpers/animateOnObserved";

export default function TopBottomWaves() {
  const { theme } = useTheme();
  const [isDark, setIsDark] = R.useState(true);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setIsDark(theme === "dark"), [theme]);

  return (
    <>
      <Observe
        freezeOnceVisible
        onEnter={ref => fadeIn(ref, "animate-fade-in")}
      >
        <Image
          src={isDark ? darkLayeredWave : lightLayeredWave}
          alt={isDark ? "dark-wave" : "light-wave"}
          className="absolute -top-1 w-full rotate-180 opacity-0"
        />
      </Observe>

      <Observe
        freezeOnceVisible
        onEnter={ref => fadeIn(ref, "animate-fade-in")}
      >
        <Image
          src={isDark ? darkLayeredWave : lightLayeredWave}
          alt={isDark ? "dark-wave" : "light-wave"}
          className="absolute -bottom-1 w-full opacity-0"
        />
      </Observe>
    </>
  );
}
