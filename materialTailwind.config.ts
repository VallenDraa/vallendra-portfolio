import { TooltipStylesType } from "@material-tailwind/react";

interface CustomStyles {
  tooltip: TooltipStylesType;
}

const customMaterialStyles: CustomStyles = {
  tooltip: {
    styles: {
      base: {
        bg: "bg-gray-800",
        color: "text-gray-300",
      },
    },
  },
};

export default customMaterialStyles;
