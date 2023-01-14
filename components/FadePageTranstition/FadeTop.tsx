export default function FadeTop({ position }: { position: string }) {
  return (
    <div
      className={`absolute inset-x-0 z-20 h-20 bg-gradient-to-b to-transparent dark:from-gray-900 ${position}`}
    />
  );
}
