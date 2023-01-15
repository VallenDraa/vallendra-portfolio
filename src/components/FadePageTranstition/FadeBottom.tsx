export default function FadeBottom({ position }: { position: string }) {
  return (
    <div
      className={`absolute inset-x-0 h-20 bg-gradient-to-b from-transparent dark:to-gray-900 ${position}`}
    />
  );
}
