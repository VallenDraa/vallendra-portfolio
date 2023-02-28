import { CldImage } from "next-cloudinary";

export default function ShowcaseImage({
  cldImageSrc,
  name = "",
  title = "",
  titleAsCaption = false,
}: {
  titleAsCaption?: boolean;
  cldImageSrc: string;
  title?: string;
  name?: string;
}) {
  return (
    <figure className="mx-auto w-full md:w-[95%]">
      <CldImage
        format="webp"
        priority
        quality={50}
        src={cldImageSrc}
        alt={name}
        title={title || name}
        width={1280}
        height={720}
        sizes="(max-width: 768px) 80vw, 100vw"
        className="w-full rounded-md object-cover opacity-90 shadow"
      />

      <figcaption className="pt-2 text-center !text-sm text-indigo-300 dark:text-zinc-500">
        <span>{titleAsCaption ? title : `Screenshot of ${name}`}</span>
      </figcaption>
    </figure>
  );
}
