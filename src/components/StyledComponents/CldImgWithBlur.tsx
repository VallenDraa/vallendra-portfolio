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
        effects={[{ blur: "2000" }]}
        format="webp"
        sizes="75vw, (min-width: 480px) 80vw, (min-width: 768px) 100vw"
        draggable={false}
        className="absolute mx-auto my-0 w-full"
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
