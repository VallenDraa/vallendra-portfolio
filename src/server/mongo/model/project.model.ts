import m from "mongoose";
import type Project from "interfaces/project.interface";

export type ProjectDocument = {
  createdAt: Date;
  updatedAt?: Date;
} & Omit<Project, "_id"> &
  m.Document;

const ProjectSchema = new m.Schema<ProjectDocument>(
  {
    icon: { type: String, required: false },
    name: { type: String, required: true },
    slug: { type: String, required: true },
    shortDescriptionEN: { type: String, required: true },
    descriptionEN: { type: String, required: true },
    shortDescriptionID: { type: String, required: true },
    descriptionID: { type: String, required: true },
    views: { type: Number },
    likes: { type: Number },
    likers: [{ type: String, default: [] }],
    image: { type: String, required: true },
    tech: [{ type: String, default: [] }],
    categoryIds: [
      {
        type: m.Schema.Types.ObjectId,
        ref: "project-categories",
        default: [],
      },
    ],
    madeAt: { type: Date, required: true },
    siteLink: { type: String, required: false },
    downloadLink: { type: String, required: false },
    gitLink: { type: String, required: true },
    isTopPick: { type: Boolean, required: true },
  },
  { timestamps: true },
);

const ProjectModel: m.Model<ProjectDocument> =
  m.models.projects || m.model<ProjectDocument>("projects", ProjectSchema);

export default ProjectModel;
