import type { Model } from "mongoose";
import type { CertificateDocument } from "server/mongo/model/certificate.model";
import type { CertificateCategory } from "server/mongo/model/certificateCategory.model";
import type { ProjectDocument } from "server/mongo/model/project.model";
import type { ProjectCategory } from "server/mongo/model/projectCategory.model";

export type LikesOperationBody = {
  operation: LikesPUTOperation;
};

export type LikesPUTOperation = "increment" | "decrement";

export type StatsType = "views" | "likes";

export type MainShowcaseCategoryModels<
  T extends ProjectCategory | CertificateCategory,
> = Model<T>;

export type MainShowcaseModels<
  T extends ProjectDocument | CertificateDocument,
> = Model<T>;
