const Line = ({ className, scale }: { className?: string; scale?: string }) => {
  return <div className={`${className} h-10 w-[1px]`} style={{ scale }} />;
};

export default Line;
