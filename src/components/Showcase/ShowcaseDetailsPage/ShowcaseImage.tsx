import ImgWithLightbox from "components/StyledComponents/ImgWithLightbox";

function ImageComponent({
  src,
  title,
  alt,
}: {
  src: string;
  title: string;
  alt: string;
}) {
  return (
    <ImgWithLightbox
      format="webp"
      priority
      quality={50}
      src={src}
      alt={alt}
      title={title}
      width={1280}
      height={720}
      className="w-full rounded-md object-cover opacity-90 shadow"
    />
  );
}

type ShowcaseImageType = {
  titleAsCaption?: boolean;
  cldImageSrc: string;
  title?: string;
  name?: string;
  withCaption?: boolean;
};

export default function ShowcaseImage({
  cldImageSrc,
  name = "",
  title = "",
  titleAsCaption = false,
  withCaption = true,
}: ShowcaseImageType) {
  return withCaption ? (
    <figure className="mx-auto w-full">
      <ImageComponent src={cldImageSrc} alt={name} title={title || name} />

      <figcaption className="pt-2 text-center !text-sm text-zinc-600 dark:text-zinc-400">
        <span>{titleAsCaption ? title : `Screenshot of ${name}`}</span>
      </figcaption>
    </figure>
  ) : (
    <ImageComponent src={cldImageSrc} alt={name} title={title || name} />
  );
}
