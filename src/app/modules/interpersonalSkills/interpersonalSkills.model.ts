import { model, Schema } from 'mongoose';
import { TInterpersonalSkills } from './interpersonalSkills.interface';

const interpersonalSkillsSchema = new Schema<TInterpersonalSkills>(
  {
    title: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const InterpersonalSkillsModel = model<TInterpersonalSkills>(
  'InterpersonalSkills',
  interpersonalSkillsSchema,
);
