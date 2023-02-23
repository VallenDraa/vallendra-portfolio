import R from "react";
import type { Menu } from "utils/data/menus";
import Link from "next/link";

function MenuComponent({ name, link }: { name: string; link: string }) {
  return (
    <li>
      <Link
        className="capitalize underline-offset-2 hover:underline"
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
