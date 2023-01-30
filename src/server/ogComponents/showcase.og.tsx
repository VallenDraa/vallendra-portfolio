import OgComponent from "../../interfaces/ogComponent.interface";

export default function Showcase({ title, shortDesc, imgLink }: OgComponent) {
  return (
    <div tw="flex flex-col w-[1280px] h-[720px] font-sans justify-around">
      {/* top */}
      <div tw="flex items-center justify-between w-[1280px] text-white h-[630px] bg-[#212121] relative">
        <div tw="absolute h-[400px] w-[400px] rounded-full bg-[#7986cb] opacity-100 top-[180px] right-[465px]" />

        {/* data */}
        <div tw="flex flex-col px-10 w-[520px] h-[630px] justify-center">
          <p tw="text-6xl text-white mb-0 text-[#f48fb1]">{title}</p>
          <p tw="text-xl text-white/80">{shortDesc}</p>
        </div>

        {/* image */}
        <img
          tw="rounded w-5/6 self-end"
          src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${imgLink}.png`}
          alt={title}
        />
      </div>

      {/* bottom */}
      <div tw="flex items-center justify-between bg-[#272727] w-[1280px] h-[90px] px-10">
        {/* my profile */}
        <div tw="flex items-center">
          <img
            tw="mr-2"
            src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/vallen-icon.png`}
            width={80}
            height={80}
          />
          <div tw="flex flex-col">
            <span tw="text-base text-white/80 mb-0.5">
              Jestine Vallendra Dwi Putra
            </span>
            <span tw="text-sm text-white/60">Front-End Web Developer</span>
          </div>
        </div>

        {/* year */}
        <span tw="text-white/80">
          &copy; {new Date().getUTCFullYear()} | vallendra.my.id
        </span>
      </div>
    </div>
  );
}
