import mongoose from "mongoose";
import Category from "../../interfaces/category";

interface ProjectCategory extends Omit<Category, "_id">, mongoose.Document {
  createdAt: Date;
  updatedAt?: Date;
}

const ProjectCategorySchema = new mongoose.Schema<ProjectCategory>({
  name: { type: String, required: true },
  items: [
    { type: mongoose.Schema.Types.ObjectId, ref: "projects", default: [] },
  ],
});

const ProjectCategoryModel =
  mongoose.models["project-categories"] ||
  mongoose.model<ProjectCategory>("project-categories", ProjectCategorySchema);

export default ProjectCategoryModel;
