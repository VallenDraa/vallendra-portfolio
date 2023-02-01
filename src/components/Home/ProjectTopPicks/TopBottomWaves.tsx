import { useTheme } from "next-themes";
import darkLayeredWave from "../../../../public/svg/dark-layered-wave.svg";
import lightLayeredWave from "../../../../public/svg/light-layered-wave.svg";
import Image from "next/image";
import R, { useEffect } from "react";

export default function TopBottomWaves() {
  const { theme } = useTheme();
  const [isDark, setIsDark] = R.useState(true);

  useEffect(() => {
    theme === "dark" ? setIsDark(true) : setIsDark(false);
  }, [theme]);

  return (
    <>
      <Image
        src={isDark ? darkLayeredWave : lightLayeredWave}
        alt={isDark ? "dark-wave" : "light-wave"}
        className="absolute top-0 w-full rotate-180 transition"
      />

      <Image
        src={isDark ? darkLayeredWave : lightLayeredWave}
        alt={isDark ? "dark-wave" : "light-wave"}
        className="absolute bottom-0 w-full transition"
      />
    </>
  );
}
