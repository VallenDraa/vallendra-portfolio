import { InputStylesType, TooltipStylesType } from "@material-tailwind/react";

interface ICustomStyles {
  tooltip: TooltipStylesType;
}

const customMaterialStyles: ICustomStyles = {
  tooltip: {
    styles: {
      base: {
        bg: "bg-gray-800",
        color: "text-white/80",
      },
    },
  },
};

export default customMaterialStyles;
