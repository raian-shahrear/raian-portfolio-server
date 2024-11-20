import { model, Schema } from 'mongoose';
import { TProject } from './projects.interface';

const projectSchema = new Schema<TProject>(
  {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    mainFeatures: {
      type: String,
      required: true,
    },
    allFeatures: {
      type: String,
      required: true,
    },
    liveLink: {
      type: String,
      required: true,
    },
    githubClient: {
      type: String,
      required: true,
    },
    githubServer: {
      type: String,
      required: true,
    },
    technologies: {
      type: String,
      required: true,
    },
    image: {
      type: [String],
      required: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const ProjectModel = model<TProject>('Project', projectSchema);
