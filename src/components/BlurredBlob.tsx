export default function BlurredBlob({
  left,
  top,
  translateX,
  translateY,
}: {
  left: string;
  top: string;
  translateX: string;
  translateY: string;
}) {
  return (
    <div
      className={`absolute h-[19rem] w-[19rem] rotate-12 skew-x-6 scale-110 rounded-full bg-gradient-to-br from-indigo-400 to-pink-400  opacity-50 blur-3xl transition-transform duration-200 dark:from-indigo-700 dark:to-pink-700  ${left} ${top} ${translateX} ${translateY}`}
    />
  );
}
