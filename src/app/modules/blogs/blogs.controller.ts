import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BlogServices } from './blogs.service';
import httpStatus from 'http-status-codes';

// create blog
const createBlog = catchAsync(async (req, res) => {
  const result = await BlogServices.createBlogIntoDB(req.user, req.body);

  // send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Blog is created successfully!',
    data: result,
  });
});

// get all blogs
const getAllBlogs = catchAsync(async (req, res) => {
  const result = await BlogServices.getAllBlogsFromDB(req.query);

  // send response
  res
    .status(result?.result?.length ? httpStatus.OK : httpStatus.NOT_FOUND)
    .json({
      success: result?.result?.length ? true : false,
      statusCode: result?.result?.length ? httpStatus.OK : httpStatus.NOT_FOUND,
      message: result?.result?.length
        ? 'Blogs are retrieved successfully!'
        : 'No Data Found!',
      data: result?.result,
      meta: result?.meta,
    });
});

// get blog by id
const getBlogById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BlogServices.getBlogByIdFromDB(id);

  // send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Blog is retrieved successfully!',
    data: result,
  });
});

// update blog
const updateBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BlogServices.updateBlogIntoDB(id, req.user, req.body);

  // send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Blog is updated successfully!',
    data: result,
  });
});

// delete blog
const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BlogServices.deleteBlogIntoDB(id, req.user);

  // send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Blog is deleted successfully!',
    data: result,
  });
});

export const BlogControllers = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
