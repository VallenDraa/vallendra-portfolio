import { FC, Fragment, useEffect, useState, useCallback } from "react";

// GENERATING RANDOM SQUARES
const FloatingSquares: FC = () => {
  const changePopulation = useCallback(() => {
    switch (true) {
      case window.innerWidth >= 1140:
        return 8;

      case window.innerWidth >= 960:
        return 6;

      default:
        return 4;
    }
  }, []);

  const [population, setPopulation] = useState(0);
  const [squares, setSquares] = useState<React.ReactElement[]>([]);

  /* Change the population of squares according to the screen size
  =============================================================== */
  useEffect(() => {
    setPopulation(changePopulation());

    window.addEventListener("resize", () => setPopulation(changePopulation));

    return () =>
      window.removeEventListener("resize", () =>
        setPopulation(changePopulation)
      );
  }, []);

  /* Render the population into actual floating squares
  ==================================================== */
  useEffect(() => {
    function generateSquares(): void {
      const newSquares: JSX.Element[] = [];

      // generating the squares
      for (let i = 0; i < population; i++) {
        const delay = Math.round(Math.random() * 35 + 1);
        const left = Math.round(Math.random() * 100 + 1);
        const size = Math.round(Math.random() * 300 + 50);

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
