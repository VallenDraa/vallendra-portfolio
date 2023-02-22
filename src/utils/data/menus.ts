type Menu =
  | {
      readonly name: string;
      readonly url: string;
      readonly subMenus?: undefined;
    }
  | {
      readonly name: string;
      readonly url?: undefined;
      readonly subMenus: { name: string; url: string }[];
    };

export const menuData: Menu[] = [
  { name: "home", url: `/#home` },
  { name: "profile", url: `/#profile` },
  { name: "blog", url: "/blog" },
  {
    name: "projects",
    subMenus: [
      { name: "top picks", url: "/#top-projects" },
      { name: "all collections", url: "/projects" },
    ],
  },
  { name: "certificates", url: "/certificates" },
];

const MENUS = ["home", "profile", "blog", "projects", "certificates"];

export default MENUS;
