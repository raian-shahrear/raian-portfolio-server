import httpStatus from 'http-status-codes';
import { TInterpersonalSkills } from './interpersonalSkills.interface';
import { UserModel } from '../user/user.model';
import AppError from '../../errors/AppError';
import { InterpersonalSkillsModel } from './interpersonalSkills.model';

// create interpersonal skill
const createInterpersonalSkillIntoDB = async (
  user: Record<string, unknown>,
  payload: TInterpersonalSkills,
) => {
  const loggedInUser = await UserModel.findOne({ email: user.userEmail });
  if (!loggedInUser) {
    throw new AppError(httpStatus.FORBIDDEN, 'Unauthorized user!');
  }
  const result = await InterpersonalSkillsModel.create(payload);
  return result;
};

// get all interpersonal skills
const getAllInterpersonalSkillsFromDB = async () => {
  const result = await InterpersonalSkillsModel.find();
  return result;
};

// get interpersonal skill by id
const getInterpersonalSkillByIdFromDB = async (id: string) => {
  const result = await InterpersonalSkillsModel.findById(id);
  return result;
};

// update interpersonal skill
const updateInterpersonalSkillIntoDB = async (
  id: string,
  user: Record<string, unknown>,
  payload: Partial<TInterpersonalSkills>,
) => {
  // checking logged in user
  const loggedInUser = await UserModel.findOne({ email: user.userEmail });
  if (!loggedInUser) {
    throw new AppError(httpStatus.FORBIDDEN, 'Unauthorized user!');
  }

  const result = await InterpersonalSkillsModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

// delete interpersonal skill
const deleteInterpersonalSkillIntoDB = async (
  id: string,
  user: Record<string, unknown>,
) => {
  // checking logged in user
  const loggedInUser = await UserModel.findOne({ email: user.userEmail });
  if (!loggedInUser) {
    throw new AppError(httpStatus.FORBIDDEN, 'Unauthorized user!');
  }

  const result = await InterpersonalSkillsModel.findByIdAndDelete(id);
  return result;
};

export const InterpersonalSkillServices = {
  createInterpersonalSkillIntoDB,
  getAllInterpersonalSkillsFromDB,
  getInterpersonalSkillByIdFromDB,
  updateInterpersonalSkillIntoDB,
  deleteInterpersonalSkillIntoDB,
};
