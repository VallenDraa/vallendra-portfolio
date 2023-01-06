export default function FadeTop({ position }: { position: string }) {
  return (
    <div
      className={`h-20 bg-gradient-to-b dark:from-gray-900 to-transparent absolute inset-x-0 z-20 ${position}`}
    />
  );
}
