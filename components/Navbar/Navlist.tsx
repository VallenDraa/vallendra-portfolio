import { useEffect, useState, Fragment } from "react";
import {
  Typography,
  Button,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import MENUS from "../../utils/misc/MenuDatas";
import Show from "../../utils/jsx/Show";
import Dropdown from "../Main/Dropdown/Dropdown";
import Link from "next/link";

export default function NavList() {
  const [accordionIsVisible, setAccordionIsVisible] = useState(false);
  const [open, setOpen] = useState(1);

  function handleOpen(value: number) {
    setOpen(open === value ? 0 : value);
  }

  useEffect(() => {
    function menuAccordionHandler() {
      window.innerWidth > 960 && accordionIsVisible
        ? setAccordionIsVisible(false)
        : setAccordionIsVisible(true);
    }

    menuAccordionHandler();

    window.addEventListener("resize", menuAccordionHandler);

    return () => window.removeEventListener("resize", menuAccordionHandler);
  }, []);

  return (
    <ul className="mb-4 mt-2 flex flex-col gap-1 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      {MENUS.map((menu: string): React.ReactNode => {
        return (
          <Fragment key={menu}>
            <Show when={menu !== "projects"}>
              <Typography as="li" variant="paragraph">
                <Button
                  color="indigo"
                  variant="text"
                  fullWidth
                  className="p-0 text-base font-semibold text-white/80 hover:text-white transition duration-200"
                >
                  <Link
                    href={`#${menu}`}
                    className="flex items-center capitalize py-2 px-3"
                  >
                    {menu}
                  </Link>
                </Button>
              </Typography>
            </Show>
            <Show when={menu === "projects"}>
              {/* project menu for large navbar */}
              <Show when={!accordionIsVisible}>
                <Dropdown
                  offset={14}
                  Handler={
                    <a className="flex items-center capitalize py-2 px-3">
                      {menu}
                    </a>
                  }
                  menuItems={[
                    <Link
                      href="#projects"
                      className="inline-block w-full h-full p-3"
                    >
                      Top Picks
                    </Link>,
                    <Link href={`/`} className="inline-block w-full h-full p-3">
                      All Collection
                    </Link>,
                  ]}
                />
              </Show>

              {/* project menu for small navbar */}
              <Show when={accordionIsVisible}>
                <Accordion open={open === 1}>
                  <AccordionHeader onClick={() => handleOpen(1)}>
                    What is Material Tailwind?
                  </AccordionHeader>
                  <AccordionBody>
                    We&apos;re not always in the position that we want to be at.
                    We&apos;re constantly growing. We&apos;re constantly making
                    mistakes. We&apos;re constantly trying to express ourselves
                    and actualize our dreams.
                  </AccordionBody>
                </Accordion>
              </Show>
            </Show>
          </Fragment>
        );
      })}
    </ul>
  );
}
