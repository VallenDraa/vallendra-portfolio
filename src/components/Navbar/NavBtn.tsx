import StyledButton from "components/StyledComponents/StyledButton";

export default function NavBtn({
  menu,
  href,
  onClick,
}: {
  menu: string;
  href?: string;
  onClick?: () => void;
}) {
  return (
    <StyledButton
      href={href}
      hrefTarget="_self"
      className="flex items-center rounded-none py-2 px-5 text-start !text-base font-semibold capitalize text-zinc-700 duration-200 hover:bg-indigo-500/10 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-white lg:justify-center lg:!rounded-md lg:px-3 dark:lg:text-zinc-200"
      onClick={() => onClick && onClick()}
    >
      {menu}
    </StyledButton>
  );
}
