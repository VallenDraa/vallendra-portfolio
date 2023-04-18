import StyledButton from "components/StyledComponents/StyledButton";

type NavBtnProps = {
  menu: string;
  href?: string;
  onClick?: () => void;
};

export default function NavBtn({ menu, href, onClick }: NavBtnProps) {
  return (
    <StyledButton
      href={href}
      hrefTarget="_self"
      className="flex items-center rounded-none px-5 py-2 text-start !text-base font-semibold capitalize text-zinc-800 duration-200 hover:bg-indigo-500/10 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-white md:justify-center md:!rounded-md md:px-3 dark:md:text-zinc-200"
      onClick={() => onClick && onClick()}
    >
      {menu}
    </StyledButton>
  );
}
