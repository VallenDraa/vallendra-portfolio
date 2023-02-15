export const compactNumberFormatter = Intl.NumberFormat(undefined, {
  notation: "compact",
});

export const commaSeparator = Intl.NumberFormat(undefined, {
  notation: "standard",
});

export const dateFormatter = Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});
