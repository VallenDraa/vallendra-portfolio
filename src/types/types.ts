export type Technologies =
  | "html"
  | "node.js"
  | "javascript"
  | "jquery"
  | "react"
  | "ejs"
  | "c#"
  | "c"
  | "unity"
  | "tailwind css"
  | "css"
  | "typescript"
  | "socket.io"
  | "java"
  | "mongodb"
  | "next.js";

export type TwistDirection = "right" | "left";

export type Categories = "website" | "desktop" | "cli" | "games";

export type Language = "id" | "en";

export type ShowcaseType = "projects" | "certificates";

/* Rest API types
================= */
export type LikesOperationBody = {
  operation: LikesPUTOperation;
};

export type LikesPUTOperation = "increment" | "decrement";

export type StatsType = "views" | "likes";

/* Font Sizes
============= */
export type TextSize =
  | "text-xs"
  | "text-sm"
  | "text-md"
  | "text-lg"
  | "text-xl"
  | "text-2xl"
  | "text-3xl"
  | "text-4xl"
  | "text-5xl"
  | "text-6xl"
  | "text-7xl";
export type SMTextSize = `sm:${TextSize}`;
export type MDTextSize = `md:${TextSize}`;
export type LGTextSize = `lg:${TextSize}`;
export type XLTextSize = `xl:${TextSize}`;
export type XXLTextSize = `2xl:${TextSize}`;

export type TextSizes = {
  textSize: TextSize;
  smTextSize?: SMTextSize;
  mdTextSize?: MDTextSize;
  lgTextSize?: LGTextSize;
  xlTextSize?: XLTextSize;
  xxlTextSize?: XXLTextSize;
};
