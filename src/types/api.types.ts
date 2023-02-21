export type LikesOperationBody = {
  operation: LikesPUTOperation;
};

export type LikesPUTOperation = "increment" | "decrement";

export type StatsType = "views" | "likes";
