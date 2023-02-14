// unused because material tailwind accordion is too laggy on low end devices, so i used the built in details tag for now

/* <Accordion open={openedAccordion === 1}>
  <Button
    color="indigo"
    variant="text"
    fullWidth
    onClick={() => handleOpenAccordion(1)}
    className="flex items-center justify-between rounded-none py-2 px-5 text-base font-semibold capitalize text-indigo-400  duration-200 hover:text-indigo-500 dark:text-gray-500 dark:hover:text-white lg:rounded-lg lg:px-3 dark:lg:text-white/70"
  >
    {menu}
    <IoChevronDown
      className={`mr-2 h-5 w-5 transition duration-200 ${
        openedAccordion === 1 ? "rotate-180" : "rotate-0"
      }`}
    />
  </Button>

  <AccordionBody className="py-1.5">
    <Link href="/#top-picks">
      <Button
        onClick={closeNav}
        color="indigo"
        variant="text"
        fullWidth
        className="rounded-none py-2 px-7 text-start text-base font-semibold capitalize text-indigo-400 duration-200 hover:text-indigo-500 dark:text-gray-500 dark:hover:text-white dark:lg:text-white/70"
      >
        Top Picks
      </Button>
    </Link>
    <Link href="/projects">
      <Button
        onClick={closeNav}
        color="indigo"
        variant="text"
        fullWidth
        className="rounded-none py-2 px-7 text-start text-base font-semibold capitalize text-indigo-400 duration-200 hover:text-indigo-500 dark:text-gray-500 dark:hover:text-white dark:lg:text-white/70"
      >
        All Collections
      </Button>
    </Link>
  </AccordionBody>
</Accordion>; */
export {};
