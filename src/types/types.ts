export type technologies =
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

export type categories = "website" | "desktop" | "cli" | "games";

export type Language = "id" | "en";

export type ShowcaseType = "projects" | "certificates";

/* Rest API types
================= */
export type LikesOperationBody = {
  operation: LikesPUTOperation;
};

export type LikesPUTOperation = "increment" | "decrement";

export type StatsType = "views" | "likes";
