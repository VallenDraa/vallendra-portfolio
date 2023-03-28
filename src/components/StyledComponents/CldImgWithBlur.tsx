import clsx from "clsx";
import { CldImage, CldImageProps } from "next-cloudinary";

export default function CldImgWithBlur({ className, ...props }: CldImageProps) {
  return (
    <div
      className={clsx(
        !className?.includes("absolute") && "relative",
        className,
      )}
    >
      <CldImage
        {...props}
        quality={1}
        height={30}
        width={50}
        rawTransformations={["e_blur:2000"]}
        format="webp"
        draggable={false}
        className={clsx("absolute mx-auto h-full w-full")}
      />

      <CldImage
        {...props}
        format="webp"
        className={clsx(
          !className?.includes("absolute") ? "relative" : "absolute z-10",
          "w-full",
        )}
      />
    </div>
  );
}
