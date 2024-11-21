import httpStatus from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ExperienceServices } from './experiences.service';

// create experience
const createExperience = catchAsync(async (req, res) => {
  const result = await ExperienceServices.createExperienceIntoDB(
    req.user,
    req.body,
  );

  // send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Experience is created successfully!',
    data: result,
  });
});

// get all experiences
const getAllExperiences = catchAsync(async (req, res) => {
  const result = await ExperienceServices.getAllExperiencesFromDB(req.query);

  // send response
  res
    .status(result?.result?.length ? httpStatus.OK : httpStatus.NOT_FOUND)
    .json({
      success: result?.result?.length ? true : false,
      statusCode: result?.result?.length ? httpStatus.OK : httpStatus.NOT_FOUND,
      message: result?.result?.length
        ? 'Experiences are retrieved successfully!'
        : 'No Data Found!',
      data: result?.result,
      meta: result?.meta,
    });
});

// get experience by id
const getExperienceById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ExperienceServices.getExperienceByIdFromDB(id);

  // send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Experience is retrieved successfully!',
    data: result,
  });
});

// update experience
const updateExperience = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ExperienceServices.updateExperienceIntoDB(
    id,
    req.user,
    req.body,
  );

  // send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Experience is updated successfully!',
    data: result,
  });
});

// delete experience
const deleteExperience = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ExperienceServices.deleteExperienceIntoDB(id, req.user);

  // send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Experience is deleted successfully!',
    data: result,
  });
});

export const ExperienceControllers = {
  createExperience,
  getAllExperiences,
  getExperienceById,
  updateExperience,
  deleteExperience,
};
