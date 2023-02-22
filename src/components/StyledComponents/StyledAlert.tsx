import { Alert, AlertProps } from "@material-tailwind/react";

type StyledAlertProps = {
  color: "green" | "red" | "deep-purple";
} &  Omit<AlertProps, "color">

export default function StyledAlert({
  show,
  className,
  icon,
  color,
  children,
  dismissible,
  ...props
}: StyledAlertProps) {
  return (
    <Alert
      icon={icon}
      className={`fixed bottom-0 z-[55] items-center rounded-none ${className}`}
      color={color}
      show={show}
      animate={{ mount: { y: 0 }, unmount: { y: 10 } }}
      dismissible={dismissible}
      {...props}
    >
      {children}
    </Alert>
  );
}
