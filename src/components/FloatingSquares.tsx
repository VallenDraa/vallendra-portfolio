import R from "react";

// GENERATING RANDOM SQUARES
export default function FloatingSquares() {
  const changePopulation = R.useCallback(() => {
    if (window.innerWidth >= 1140) {
      return 12;
    }
    if (window.innerWidth >= 960) {
      return 10;
    }
    return 8;
  }, []);

  const [population, setPopulation] = R.useState(8);
  const [squares, setSquares] = R.useState<React.ReactElement[]>([]);

  /* Change the population of squares according to the screen size
  =============================================================== */
  R.useEffect(() => {
    setPopulation(changePopulation());

    window.addEventListener("resize", () => setPopulation(changePopulation));

    return () =>
      window.removeEventListener("resize", () =>
        setPopulation(changePopulation),
      );
  }, []);

  /* Render the population into actual floating squares
  ==================================================== */
  R.useEffect(() => {
    const newSquares: JSX.Element[] = [];

    // generating the squares
    for (let i = 0; i < population; i += 1) {
      const delay = Math.round(Math.random() * 35 + 1);
      const left = Math.round(Math.random() * 100 + 1);
      const size = Math.round(Math.random() * 120 + 50);

      newSquares.push(
        <li
          className="absolute block animate-squares bg-white/10"
          style={{
            animationDelay: `${delay}s`,
            left: `${left}%`,
            width: `${size}px`,
            height: `${size}px`,
            bottom: `-${size}px`,
          }}
        />,
      );
    }

    // rendering the new squares
    setSquares(newSquares);
  }, [population]);

  return (
    <ul className="sm:margin-0 absolute inset-0 z-0 h-full w-full overflow-hidden p-0">
      {squares.map((square, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <R.Fragment key={i}>{square}</R.Fragment>
      ))}
    </ul>
  );
}
