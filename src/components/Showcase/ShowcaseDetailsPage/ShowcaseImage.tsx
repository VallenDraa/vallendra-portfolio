import { CldImage } from "next-cloudinary";

export default function ShowcaseImage({
  cldImageSrc,
  name,
}: {
  cldImageSrc: string;
  name: string;
}) {
  return (
    <figure className="mx-auto w-full md:w-[95%]">
      <CldImage
        format="webp"
        priority
        quality={45}
        src={cldImageSrc}
        alt={name}
        width={1280}
        height={720}
        className="w-full rounded-md object-cover opacity-90 shadow"
      />

      <figcaption className="pt-2 text-center text-sm text-indigo-300 dark:text-gray-500">
        <span>Screenshot of {name}</span>
      </figcaption>
    </figure>
  );
}
