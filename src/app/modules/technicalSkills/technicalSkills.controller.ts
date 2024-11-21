import httpStatus from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { TechnicalSkillsServices } from './technicalSkills.service';

// create technical skill
const createTechnicalSkill = catchAsync(async (req, res) => {
  const result = await TechnicalSkillsServices.createTechnicalSkillIntoDB(
    req.user,
    req.body,
  );

  // send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Skills are created successfully!',
    data: result,
  });
});

// get all technical skills
const getAllTechnicalSkills = catchAsync(async (req, res) => {
  const result = await TechnicalSkillsServices.getAllTechnicalSkillsFromDB();

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

// get technical skill by id
const getTechnicalSkillById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await TechnicalSkillsServices.getTechnicalSkillByIdFromDB(id);

  // send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Skill is retrieved successfully!',
    data: result,
  });
});

// delete technical skill
const deleteTechnicalSkill = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await TechnicalSkillsServices.deleteTechnicalSkillIntoDB(
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

export const TechnicalSkillsControllers = {
  createTechnicalSkill,
  getAllTechnicalSkills,
  getTechnicalSkillById,
  deleteTechnicalSkill,
};
