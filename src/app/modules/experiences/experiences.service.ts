import httpStatus from 'http-status-codes';
import { TExperience } from './experiences.interface';
import { UserModel } from '../user/user.model';
import AppError from '../../errors/AppError';
import { ExperienceModel } from './experiences.model';
import QueryBuilder from '../../builder/QueryBuilder';

// create experience
const createExperienceIntoDB = async (
  user: Record<string, unknown>,
  payload: TExperience,
) => {
  const loggedInUser = await UserModel.findOne({ email: user.userEmail });
  if (!loggedInUser) {
    throw new AppError(httpStatus.FORBIDDEN, 'Unauthorized user!');
  }
  const result = await ExperienceModel.create(payload);
  return result;
};

// get all experiences
const getAllExperiencesFromDB = async (query: Record<string, unknown>) => {
  const getQuery = new QueryBuilder(ExperienceModel.find(), query)
    .sort()
    .search(['companyName', 'designation', 'employeeType', 'locationType'])
    .paginate();
  const result = await getQuery.queryModel;
  const meta = await getQuery.countTotal();

  return {
    meta,
    result,
  };
};

// get experience by id
const getExperienceByIdFromDB = async (id: string) => {
  const result = await ExperienceModel.findById(id);

  return result;
};

// update experience
const updateExperienceIntoDB = async (
  id: string,
  user: Record<string, unknown>,
  payload: Partial<TExperience>,
) => {
  // checking logged in user
  const loggedInUser = await UserModel.findOne({ email: user.userEmail });
  if (!loggedInUser) {
    throw new AppError(httpStatus.FORBIDDEN, 'Unauthorized user!');
  }

  const result = await ExperienceModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

// delete experience
const deleteExperienceIntoDB = async (
  id: string,
  user: Record<string, unknown>,
) => {
  // checking logged in user
  const loggedInUser = await UserModel.findOne({ email: user.userEmail });
  if (!loggedInUser) {
    throw new AppError(httpStatus.FORBIDDEN, 'Unauthorized user!');
  }

  const result = await ExperienceModel.findByIdAndDelete(id);
  return result;
};

export const ExperienceServices = {
  createExperienceIntoDB,
  getAllExperiencesFromDB,
  getExperienceByIdFromDB,
  updateExperienceIntoDB,
  deleteExperienceIntoDB,
};
