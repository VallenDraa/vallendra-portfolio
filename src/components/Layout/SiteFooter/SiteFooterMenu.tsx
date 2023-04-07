import R from "react";
import type { Menu } from "utils/data/menus";
import Link from "next/link";

function MenuComponent({ name, link }: { name: string; link: string }) {
  return (
    <li>
      <Link
        className="normal-underline relative capitalize duration-200 before:transition before:duration-200 hover:text-pink-400 before:hover:-translate-y-1 before:hover:bg-pink-400 dark:hover:text-pink-300 dark:before:hover:bg-pink-300"
        href={link}
      >
        {name}
      </Link>
    </li>
  );
}

export default function SiteFooterMenu({ data }: { data: Menu }) {
  return (
    <R.Fragment key={data.name}>
      {data.subMenus === undefined ? (
        <MenuComponent key={data.name} link={data.url} name={data.name} />
      ) : (
        data.subMenus.map(subMenu => (
          <MenuComponent
            key={subMenu.name}
            link={subMenu.url}
            name={subMenu.name}
          />
        ))
      )}
    </R.Fragment>
  );
}
