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
      className={`absolute h-80 w-80 rotate-12 skew-x-6 scale-110 rounded-full bg-gradient-to-br from-indigo-400 to-pink-400  opacity-50 blur-3xl transition-transform duration-200 dark:from-indigo-700 dark:to-pink-700 md:top-1/2 md:-translate-y-1/2 ${left} ${top} ${translateX} ${translateY}`}
    />
  );
}
