export type technologies =
  | "html"
  | "node.js"
  | "javascript"
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

/* Rest API types
================= */

export type LikesOperationBody = {
  operation: LikesPUTOperation;
};

export type LikesPUTOperation = "increment" | "decrement";

export type StatsType = "views" | "likes";
