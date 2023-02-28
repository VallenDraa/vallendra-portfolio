/**
 *       <details>
                    <summary
                      onClick={() => handleOpenAccordion(i)}
                      className="flex cursor-pointer items-center justify-between rounded-none py-2 px-5 text-base font-semibold capitalize text-indigo-400  transition-colors duration-200 hover:bg-zinc-500/10 hover:text-indigo-500 active:bg-zinc-500/20 dark:text-zinc-400 dark:hover:text-white lg:rounded-lg lg:px-3 dark:lg:text-zinc-200"
                    >
                      {menu.name}
                      <IoChevronDown
                        className={clsx(
                          "mr-2 h-5 w-5 transition duration-200",
                          openedAccordion === i ? "rotate-180" : "rotate-0",
                        )}
                      />
                    </summary>
                    <div className="py-1.5">
                      {menu.subMenus.map(subMenu => (
                        <Link href={subMenu.url} key={subMenu.url}>
                          <Button
                            onClick={closeNav}
                            color="indigo"
                            variant="text"
                            fullWidth
                            className="rounded-none py-2 px-7 text-start text-base font-semibold capitalize text-indigo-400 duration-200 hover:text-indigo-500 dark:text-zinc-400 dark:hover:text-white dark:lg:text-zinc-300"
                          >
                            {subMenu.name}
                          </Button>
                        </Link>
                      ))}
                    </div>
                  </details>
 * 
 */

export {};
