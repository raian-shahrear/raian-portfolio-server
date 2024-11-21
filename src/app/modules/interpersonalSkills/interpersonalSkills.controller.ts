import httpStatus from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { InterpersonalSkillServices } from './interpersonalSkills.service';

// create interpersonal skill
const createInterpersonalSkill = catchAsync(async (req, res) => {
  const result =
    await InterpersonalSkillServices.createInterpersonalSkillIntoDB(
      req.user,
      req.body,
    );

  // send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Skill is created successfully!',
    data: result,
  });
});

// get all interpersonal skills
const getAllInterpersonalSkills = catchAsync(async (req, res) => {
  const result =
    await InterpersonalSkillServices.getAllInterpersonalSkillsFromDB();

  // send response
  res.status(result?.length ? httpStatus.OK : httpStatus.NOT_FOUND).json({
    success: result?.length ? true : false,
    statusCode: result?.length ? httpStatus.OK : httpStatus.NOT_FOUND,
    message: result?.length
      ? 'Skills are retrieved successfully!'
      : 'No Data Found!',
    data: result,
  });
});

// get interpersonal skill by id
const getInterpersonalSkillById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await InterpersonalSkillServices.getInterpersonalSkillByIdFromDB(id);

  // send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Skill is retrieved successfully!',
    data: result,
  });
});

// update interpersonal skill
const updateInterpersonalSkill = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await InterpersonalSkillServices.updateInterpersonalSkillIntoDB(
      id,
      req.user,
      req.body,
    );

  // send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Skill is updated successfully!',
    data: result,
  });
});

// delete interpersonal skill
const deleteInterpersonalSkill = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await InterpersonalSkillServices.deleteInterpersonalSkillIntoDB(
      id,
      req.user,
    );

  // send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Skill is deleted successfully!',
    data: result,
  });
});

export const InterpersonalSkillControllers = {
  createInterpersonalSkill,
  getAllInterpersonalSkills,
  getInterpersonalSkillById,
  updateInterpersonalSkill,
  deleteInterpersonalSkill,
};
