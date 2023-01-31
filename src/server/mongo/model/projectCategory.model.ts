import m from "mongoose";
import Category from "../../../interfaces/category.interface";

interface ProjectCategory extends Omit<Category, "_id">, m.Document {
  madeAt: Date;
  updatedAt?: Date;
}

const ProjectCategorySchema = new m.Schema<ProjectCategory>(
  {
    name: { type: String, required: true },
    items: [{ type: m.Schema.Types.ObjectId, ref: "projects", default: [] }],
  },
  { timestamps: true }
);

const ProjectCategoryModel: m.Model<ProjectCategory> =
  m.models["project-categories"] ||
  m.model<ProjectCategory>("project-categories", ProjectCategorySchema);

export default ProjectCategoryModel;
