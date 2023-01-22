import mongoose from "mongoose";
import { Project } from "../../interfaces/project.interface";

interface ProjectDocument extends Omit<Project, "_id">, mongoose.Document {
  createdAt: Date;
  updatedAt?: Date;
}

const ProjectSchema = new mongoose.Schema<ProjectDocument>({
  icon: { type: String, required: false },
  name: { type: String, required: true },
  slug: { type: String, required: true },
  shortDescriptionEN: { type: String, required: true },
  descriptionEN: { type: String, required: true },
  shortDescriptionID: { type: String, required: true },
  descriptionID: { type: String, required: true },
  views: { type: Number },
  likes: { type: Number },
  image: { type: String, required: true },
  tech: [{ type: String, default: [] }],
  categoryIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "project-categories",
      default: [],
    },
  ],
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: false },
  siteLink: { type: String, required: false },
  downloadLink: { type: String, required: false },
  gitLink: { type: String, required: true },
  isTopPick: { type: Boolean, required: true },
});

const ProjectModel =
  mongoose.models.projects ||
  mongoose.model<ProjectDocument>("projects", ProjectSchema);

export default ProjectModel;
