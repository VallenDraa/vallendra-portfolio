export default function FadeBottom({ position }: { position: string }) {
  return (
    <div
      className={`h-20 inset-x-0 bg-gradient-to-b from-transparent dark:to-gray-900 absolute ${position}`}
    />
  );
}
