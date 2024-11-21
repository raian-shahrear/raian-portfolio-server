import httpStatus from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ProjectServices } from './projects.service';

// create project
const createProject = catchAsync(async (req, res) => {
  const result = await ProjectServices.createProjectIntoDB(req.user, req.body);

  // send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Project is created successfully!',
    data: result,
  });
});

// get all projects
const getAllProjects = catchAsync(async (req, res) => {
  const result = await ProjectServices.getAllProjectsFromDB(req.query);

  // send response
  res
    .status(result?.result?.length ? httpStatus.OK : httpStatus.NOT_FOUND)
    .json({
      success: result?.result?.length ? true : false,
      statusCode: result?.result?.length ? httpStatus.OK : httpStatus.NOT_FOUND,
      message: result?.result?.length
        ? 'Projects are retrieved successfully!'
        : 'No Data Found!',
      data: result?.result,
      meta: result?.meta,
    });
});

// get project by id
const getProjectById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProjectServices.getProjectByIdFromDB(id);

  // send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Project is retrieved successfully!',
    data: result,
  });
});

// update project
const updateProject = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProjectServices.updateProjectIntoDB(
    id,
    req.user,
    req.body,
  );

  // send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Project is updated successfully!',
    data: result,
  });
});

// delete project
const deleteProject = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProjectServices.deleteProjectIntoDB(id, req.user);

  // send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Project is deleted successfully!',
    data: result,
  });
});

export const ProjectControllers = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
