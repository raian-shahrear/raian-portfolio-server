import { model, Schema } from 'mongoose';
import { TCompanyProject, TExperience } from './experiences.interface';

const companyProjectSchema = new Schema<TCompanyProject>(
  {
    title: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      default: '',
    },
    technology: {
      type: String,
      default: '',
    },
  },
  { _id: false },
);

const experienceSchema = new Schema<TExperience>(
  {
    companyName: {
      type: String,
      required: true,
    },
    companyLocation: {
      type: String,
      required: true,
    },
    companyLink: {
      type: String,
      required: true,
    },
    joiningDate: {
      type: Date,
      required: true,
    },
    endingDate: {
      type: Date,
    },
    designation: {
      type: String,
      required: true,
    },
    employeeType: {
      type: String,
      enum: ['Full-time', 'Part-time', 'Contact', 'Internship'],
      required: true,
    },
    locationType: {
      type: String,
      enum: ['On-site', 'Hybrid', 'Remote'],
      required: true,
    },
    responsibility: {
      type: String,
      required: true,
    },
    companyProject: {
      type: [companyProjectSchema],
      default: [],
    },
  },
  { timestamps: true },
);

export const ExperienceModel = model<TExperience>(
  'Experience',
  experienceSchema,
);
