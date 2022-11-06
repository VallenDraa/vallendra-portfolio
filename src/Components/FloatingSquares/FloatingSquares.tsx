import { FC } from "react";

// GENERATING RANDOM SQUARES
const POPULATION = 15;
const squares: JSX.Element[] = []; // hold the squares with the same amount as the population

for (let i = 0; i < POPULATION; i++) {
  const delay = Math.round(Math.random() * 35 + 1);
  const left = Math.round(Math.random() * 100 + 1);
  const size = Math.round(Math.random() * 200 + 50);

  squares.push(
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

const FloatingSquares: FC = () => {
  return (
    <ul className="h-full inset-0 margin-0 padding-0 overflow-hidden z-0 absolute w-full">
      {squares.map((square) => square)}
    </ul>
  );
};

export default FloatingSquares;
