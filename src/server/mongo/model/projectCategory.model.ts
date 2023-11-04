import m from "mongoose";
import type Category from "interfaces/category.interface";

export type ProjectCategory = {
  madeAt: Date;
  updatedAt?: Date;
} & Omit<Category, "_id"> &
  m.Document;

const ProjectCategorySchema = new m.Schema<ProjectCategory>(
  {
    name: { type: String, required: true },
    items: [{ type: m.Schema.Types.ObjectId, ref: "projects", default: [] }],
  },
  { timestamps: true },
);

const ProjectCategoryModel: m.Model<ProjectCategory> =
  m.models["project-categories"] ||
  m.model<ProjectCategory>("project-categories", ProjectCategorySchema);

export default ProjectCategoryModel;
