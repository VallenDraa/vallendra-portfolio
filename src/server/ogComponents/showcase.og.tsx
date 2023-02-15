/* eslint-disable @next/next/no-img-element */
import OgComponent from "interfaces/ogComponent.interface";

export default function Showcase({ title, shortDesc }: OgComponent) {
  return (
    <div tw="flex flex-col w-full h-full font-sans justify-around">
      {/* top */}
      <div tw="flex w-full text-white h-[540px] bg-[#212121] relative">
        <div
          tw="absolute h-[650px] w-[650px] rounded-full bg-[#7986cb] opacity-100 top-[-120px] right-[-80px]"
          style={{ zIndex: "30" }}
        />
        <div
          tw="absolute h-[700px] w-[700px] shadow-2xl rounded-full bg-[#ce93d8] opacity-100 top-[80px] right-[-25px]"
          style={{ zIndex: "0" }}
        />
        {/* data */}
        <div tw="flex flex-col px-10 w-[500px] h-[540px] justify-center">
          <p tw="text-5xl text-white mb-0 text-gray-50 opacity-90">{title}</p>
          <p tw="text-xl text-gray-300">{shortDesc}</p>
        </div>
      </div>

      {/* bottom */}
      <div tw="flex items-center justify-between bg-[#272727] w-full h-[90px] px-10">
        {/* my profile */}
        <div tw="flex items-center">
          <img
            tw="mr-2"
            src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/vallen-icon.png`}
            alt="VallenDra"
            width={80}
            height={80}
          />
          <div tw="flex flex-col">
            <span tw="text-base text-gray-300 mb-0.5">
              Jestine Vallendra Dwi Putra
            </span>
            <span tw="text-sm text-gray-400">Front-End Web Developer</span>
          </div>
        </div>

        {/* year */}
        <span tw="text-gray-300">
          &copy; {new Date().getUTCFullYear()} | vallendra.my.id
        </span>
      </div>
    </div>
  );
}
