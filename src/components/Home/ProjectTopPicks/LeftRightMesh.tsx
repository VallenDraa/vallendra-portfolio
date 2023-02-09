import Image from "next/image";
import { useTheme } from "next-themes";
import R from "react";
import lightMesh from "../../../../public/svg/light-mesh.svg";
import darkMesh from "../../../../public/svg/dark-mesh.svg";
import { TwistDirection } from "../../../types/types";

export default function LeftRightMesh({
  twistDirection,
  className = "",
}: {
  twistDirection: TwistDirection;
  className?: string;
}) {
  const { theme } = useTheme();
  const [isDark, setIsDark] = R.useState(true);

  R.useEffect(() => setIsDark(theme === "dark"), [theme]);

  return (
    <Image
      src={isDark ? darkMesh : lightMesh}
      alt={isDark ? "dark-mesh" : "light-mesh"}
      width={300}
      className={`absolute ${
        twistDirection === "left" ? "left-0" : "right-0"
      } ${className}`}
    />
  );
}
