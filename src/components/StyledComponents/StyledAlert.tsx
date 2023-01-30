import { Alert, AlertProps } from "@material-tailwind/react";

interface Props extends Omit<AlertProps, "color"> {
  color: "green" | "red" | "deep-purple";
}

export default function StyledAlert({
  show,
  className,
  icon,
  color,
  children,
  dismissible,
  ...props
}: Props) {
  return (
    <Alert
      icon={icon}
      className={`fixed bottom-0 z-[55] items-center rounded-none ${className}`}
      color={color}
      show={show}
      animate={{ mount: { y: 0 }, unmount: { y: 100 } }}
      dismissible={dismissible}
      {...props}
    >
      {children}
    </Alert>
  );
}
