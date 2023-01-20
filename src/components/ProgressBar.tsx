import NextNProgress from "nextjs-progressbar";

export default function ProgressBar() {
  return (
    <NextNProgress
      color="rgb(121 134 203)"
      showOnShallow
      options={{ showSpinner: false, easing: "ease-in-out", speed: 1000 }}
    />
  );
}
