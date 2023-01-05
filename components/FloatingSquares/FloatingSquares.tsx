import { FC, Fragment, useEffect, useState } from "react";

// GENERATING RANDOM SQUARES

const FloatingSquares: FC = () => {
  const POPULATION = 8;
  const [squares, setSquares] = useState<React.ReactElement[]>([]);

  useEffect(() => {
    function generateSquares(): void {
      for (let i = 0; i < POPULATION; i++) {
        const delay = Math.round(Math.random() * 35 + 1);
        const left = Math.round(Math.random() * 100 + 1);
        const size = Math.round(Math.random() * 200 + 50);

        setSquares((prev) => [
          ...prev,
          <li
            className="absolute block bg-white/10 animate-squares"
            style={{
              animationDelay: `${delay}s`,
              left: `${left}%`,
              width: `${size}px`,
              height: `${size}px`,
              bottom: `-${size}px`,
            }}
          ></li>,
        ]);
      }
    }

    generateSquares();

    return () => setSquares([]);
  }, []);

  return (
    <ul className="h-full inset-0 margin-0 padding-0 overflow-hidden z-0 absolute w-full">
      {squares.map((square, i) => (
        <Fragment key={i}>{square}</Fragment>
      ))}
    </ul>
  );
};

export default FloatingSquares;
