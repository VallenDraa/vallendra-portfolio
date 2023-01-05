import { FC, Fragment, useEffect, useState } from "react";

// GENERATING RANDOM SQUARES
const FloatingSquares: FC = () => {
  const [population, setPopulation] = useState(8);
  const [squares, setSquares] = useState<React.ReactElement[]>([]);

  useEffect(() => {
    function changePopulation() {
      switch (true) {
        case window.innerWidth >= 1140:
          setPopulation(12);
          break;

        case window.innerWidth >= 960:
          setPopulation(8);
          break;

        default:
          setPopulation(4);
          break;
      }
    }

    changePopulation();

    window.addEventListener("resize", changePopulation);

    return () => window.removeEventListener("resize", changePopulation);
  }, []);

  useEffect(() => {
    function generateSquares(): void {
      const newSquares: JSX.Element[] = [];

      // generating the squares
      for (let i = 0; i < population; i++) {
        const delay = Math.round(Math.random() * 35 + 1);
        const left = Math.round(Math.random() * 100 + 1);
        const size = Math.round(Math.random() * 350 + 50);

        newSquares.push(
          <li
            className="absolute block bg-white/10 animate-squares"
            style={{
              animationDelay: `${delay}s`,
              left: `${left}%`,
              width: `${size}px`,
              height: `${size}px`,
              bottom: `-${size}px`,
            }}
          ></li>
        );
      }

      // rendering the new squares
      setSquares(newSquares);
    }

    generateSquares();
  }, [population]);

  return (
    <ul className="h-full inset-0 sm:margin-0 padding-0 overflow-hidden z-0 absolute w-full">
      {squares.map((square, i) => (
        <Fragment key={i}>{square}</Fragment>
      ))}
    </ul>
  );
};

export default FloatingSquares;
