import { FC } from "react";
import vallen from "../../images/vallen.png";
import Image from "next/image";

const Logo: FC = () => {
  return (
    <div className="relative aspect-square">
      {/* outer blob */}
      <svg
        className="w-[500px]"
        viewBox="0 0 200 200"
        xmlns="https://www.w3.org/2000/svg"
      >
        <path
          fill="rgb(14 165 233)"
          d="M49.2,-64.8C64.9,-56.4,79.3,-43.4,84.8,-27.4C90.2,-11.3,86.6,7.8,79.1,24C71.5,40.2,60,53.4,46.1,61.7C32.3,69.9,16.1,73.1,-0.4,73.6C-16.9,74.2,-33.9,72,-48.3,64C-62.7,56,-74.6,42,-81.2,25.5C-87.9,8.9,-89.2,-10.3,-84.6,-28.4C-80,-46.6,-69.3,-63.7,-54.2,-72.3C-39.1,-80.9,-19.6,-80.9,-1.4,-79C16.8,-77.1,33.6,-73.3,49.2,-64.8Z"
          transform="translate(100 100)"
        />
      </svg>
      {/* inner blob */}
      <svg
        className="w-[450px] absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
        viewBox="0 0 200 200"
        xmlns="https://www.w3.org/2000/svg"
      >
        <path
          fill="rgb(251 191 36)"
          d="M62.3,-34C74.9,-14.2,75.3,14.8,62.9,36.2C50.4,57.6,25.2,71.6,1,71C-23.1,70.4,-46.3,55.2,-60.3,32.9C-74.2,10.6,-79.1,-18.9,-67.5,-38.2C-55.9,-57.4,-28,-66.3,-1.6,-65.4C24.9,-64.5,49.7,-53.8,62.3,-34Z"
          transform="translate(100 100)"
        />
      </svg>
      <Image
        src={vallen}
        alt="Jestine Vallendra Dwi Putra"
        className="absolute top-[10px] left-[20px] scale-[1.9]"
      />
    </div>
  );
};

export default Logo;
