import AppError from '../../errors/AppError';
import { UserModel } from '../user/user.model';
import { TProject } from './projects.interface';
import httpStatus from 'http-status-codes';
import { ProjectModel } from './projects.model';
import QueryBuilder from '../../builder/QueryBuilder';

// create project
const createProjectIntoDB = async (
  user: Record<string, unknown>,
  payload: TProject,
) => {
  const loggedInUser = await UserModel.findOne({ email: user.userEmail });
  if (!loggedInUser) {
    throw new AppError(httpStatus.FORBIDDEN, 'Unauthorized user!');
  }
  const result = await ProjectModel.create(payload);
  return result;
};

// get all projects
const getAllProjectsFromDB = async (query: Record<string, unknown>) => {
  const getQuery = new QueryBuilder(ProjectModel.find(), query)
    .sort()
    .search(['title', 'subtitle', 'allFeatures', 'technologies'])
    .paginate();
  const result = await getQuery.queryModel;
  const meta = await getQuery.countTotal();

  return {
    meta,
    result,
  };
};

// get project by id
const getProjectByIdFromDB = async (id: string) => {
  const result = await ProjectModel.findById(id);

  return result;
};

// update project
const updateProjectIntoDB = async (
  id: string,
  user: Record<string, unknown>,
  payload: Partial<TProject>,
) => {
  // checking logged in user
  const loggedInUser = await UserModel.findOne({ email: user.userEmail });
  if (!loggedInUser) {
    throw new AppError(httpStatus.FORBIDDEN, 'Unauthorized user!');
  }

  const result = await ProjectModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

// delete project
const deleteProjectIntoDB = async (
  id: string,
  user: Record<string, unknown>,
) => {
  // checking logged in user
  const loggedInUser = await UserModel.findOne({ email: user.userEmail });
  if (!loggedInUser) {
    throw new AppError(httpStatus.FORBIDDEN, 'Unauthorized user!');
  }

  const result = await ProjectModel.findByIdAndDelete(id);
  return result;
};

export const ProjectServices = {
  createProjectIntoDB,
  getAllProjectsFromDB,
  getProjectByIdFromDB,
  updateProjectIntoDB,
  deleteProjectIntoDB,
};
