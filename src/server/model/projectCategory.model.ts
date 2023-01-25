import mongoose, { Model } from "mongoose";
import Category from "../../interfaces/category.interface";

interface ProjectCategory extends Omit<Category, "_id">, mongoose.Document {
  madeAt: Date;
  updatedAt?: Date;
}

const ProjectCategorySchema = new mongoose.Schema<ProjectCategory>(
  {
    name: { type: String, required: true },
    items: [
      { type: mongoose.Schema.Types.ObjectId, ref: "projects", default: [] },
    ],
  },
  { timestamps: true }
);

const ProjectCategoryModel: Model<ProjectCategory> =
  mongoose.models["project-categories"] ||
  mongoose.model<ProjectCategory>("project-categories", ProjectCategorySchema);

export default ProjectCategoryModel;
