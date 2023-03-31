import clsx from "clsx";
import { CldImage, CldImageProps } from "next-cloudinary";

type CldImgWithBlurProps = CldImageProps & {
  hasDynamicSize?: boolean;
};

export default function CldImgWithBlur({
  className,
  hasDynamicSize = true,
  ...props
}: CldImgWithBlurProps) {
  return (
    <div
      className={clsx(
        !className?.includes("absolute") && "relative",
        className,
        "overflow-clip",
      )}
    >
      <CldImage
        {...props}
        quality={1}
        sizes="75vw"
        format="webp"
        effects={[{ blur: "2000" }]}
        className="absolute my-0 h-full w-full"
      />

      <CldImage
        {...props}
        format="webp"
        sizes={
          hasDynamicSize
            ? "75vw, (min-width: 480px) 80vw, (min-width: 768px) 100vw"
            : ""
        }
        className={clsx(
          !className?.includes("absolute") ? "relative" : "absolute",
          "z-10 w-full",
        )}
      />
    </div>
  );
}
