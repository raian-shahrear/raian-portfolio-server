import { model, Schema } from 'mongoose';
import { TTechnical, TTechnicalSkills } from './technicalSkills.interface';

const technicalSchema = new Schema<TTechnical>({
  icon: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

const technicalSkillsSchema = new Schema<TTechnicalSkills>(
  {
    userEmail: {
      type: String,
      required: true,
    },
    expertise: {
      type: [technicalSchema],
      default: [],
    },
    comfortable: {
      type: [technicalSchema],
      default: [],
    },
    familiar: {
      type: [technicalSchema],
      default: [],
    },
    tools: {
      type: [technicalSchema],
      default: [],
    },
  },
  { timestamps: true },
);

export const TechnicalSkillsModel = model<TTechnicalSkills>(
  'TechnicalSkills',
  technicalSkillsSchema,
);
