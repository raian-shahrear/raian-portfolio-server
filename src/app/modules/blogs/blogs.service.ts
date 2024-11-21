import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { UserModel } from '../user/user.model';
import { TBlog } from './blogs.interface';
import { BlogModel } from './blogs.model';
import httpStatus from 'http-status-codes';

// create blog
const createBlogIntoDB = async (
  user: Record<string, unknown>,
  payload: TBlog,
) => {
  const loggedInUser = await UserModel.findOne({ email: user.userEmail });
  if (!loggedInUser) {
    throw new AppError(httpStatus.FORBIDDEN, 'Unauthorized user!');
  }
  const result = await BlogModel.create(payload);
  return result;
};

// get all blogs
const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
  const getQuery = new QueryBuilder(BlogModel.find(), query)
    .sort()
    .search(['title', 'description'])
    .paginate();
  const result = await getQuery.queryModel;
  const meta = await getQuery.countTotal();

  return {
    meta,
    result,
  };
};

// get blog by id
const getBlogByIdFromDB = async (id: string) => {
  const result = await BlogModel.findById(id);

  return result;
};

// update blog
const updateBlogIntoDB = async (
  id: string,
  user: Record<string, unknown>,
  payload: Partial<TBlog>,
) => {
  // checking logged in user
  const loggedInUser = await UserModel.findOne({ email: user.userEmail });
  if (!loggedInUser) {
    throw new AppError(httpStatus.FORBIDDEN, 'Unauthorized user!');
  }

  const result = await BlogModel.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

// delete blog
const deleteBlogIntoDB = async (id: string, user: Record<string, unknown>) => {
  // checking logged in user
  const loggedInUser = await UserModel.findOne({ email: user.userEmail });
  if (!loggedInUser) {
    throw new AppError(httpStatus.FORBIDDEN, 'Unauthorized user!');
  }

  const result = await BlogModel.findByIdAndDelete(id);
  return result;
};

export const BlogServices = {
  createBlogIntoDB,
  getAllBlogsFromDB,
  getBlogByIdFromDB,
  updateBlogIntoDB,
  deleteBlogIntoDB,
};
