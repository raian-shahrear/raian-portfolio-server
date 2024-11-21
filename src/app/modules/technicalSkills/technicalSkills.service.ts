import httpStatus from 'http-status-codes';
import { UserModel } from '../user/user.model';
import AppError from '../../errors/AppError';
import { TTechnicalSkills } from './technicalSkills.interface';
import { TechnicalSkillsModel } from './technicalSkills.model';

// create technical skill
const createTechnicalSkillIntoDB = async (
  user: Record<string, unknown>,
  payload: TTechnicalSkills,
) => {
  const loggedInUser = await UserModel.findOne({ email: user.userEmail });
  if (!loggedInUser) {
    throw new AppError(httpStatus.FORBIDDEN, 'Unauthorized user!');
  }

  const existingSkills = await TechnicalSkillsModel.findOne({
    userEmail: user.userEmail,
  });
  if (existingSkills) {
    const updatedSkills = await TechnicalSkillsModel.findOneAndUpdate(
      { userEmail: user.userEmail },
      {
        $addToSet: {
          expertise: { $each: payload.expertise || [] },
          comfortable: { $each: payload.comfortable || [] },
          familiar: { $each: payload.familiar || [] },
          tools: { $each: payload.tools || [] },
        },
      },
      { new: true, upsert: true },
    );
    return updatedSkills;
  } else {
    payload.userEmail = loggedInUser.email;
    const newSkills = await TechnicalSkillsModel.create(payload);
    return newSkills;
  }
};

// get all technical skills
const getAllTechnicalSkillsFromDB = async () => {
  const result = await TechnicalSkillsModel.find();
  return result;
};

// get technical skill by id
const getTechnicalSkillByIdFromDB = async (id: string) => {
  const result = await TechnicalSkillsModel.findOne({
    $or: [
      { 'expertise._id': id },
      { 'comfortable._id': id },
      { 'familiar._id': id },
      { 'tools._id': id },
    ],
  });

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Skill not found!');
  }

  // Extract the specific skill from the appropriate array
  const skill =
    result?.expertise?.find((item) => item?._id?.toString() === id) ||
    result?.comfortable?.find((item) => item?._id?.toString() === id) ||
    result?.familiar?.find((item) => item?._id?.toString() === id) ||
    result?.tools?.find((item) => item?._id?.toString() === id);

  return skill;
};

// delete technical skill
const deleteTechnicalSkillIntoDB = async (
  id: string,
  user: Record<string, unknown>,
) => {
  // checking logged in user
  const loggedInUser = await UserModel.findOne({ email: user.userEmail });
  if (!loggedInUser) {
    throw new AppError(httpStatus.FORBIDDEN, 'Unauthorized user!');
  }

  // const result = await TechnicalSkillsModel.findByIdAndDelete(id);
  const result = await TechnicalSkillsModel.updateOne(
    {
      $or: [
        { 'expertise._id': id },
        { 'comfortable._id': id },
        { 'familiar._id': id },
        { 'tools._id': id },
      ],
    },
    {
      $pull: {
        expertise: { _id: id },
        comfortable: { _id: id },
        familiar: { _id: id },
        tools: { _id: id },
      },
    },
  );

  if (result.modifiedCount === 0) {
    throw new AppError(httpStatus.NOT_FOUND, 'Skill not found!');
  }

  return result;
};

export const TechnicalSkillsServices = {
  createTechnicalSkillIntoDB,
  getAllTechnicalSkillsFromDB,
  getTechnicalSkillByIdFromDB,
  deleteTechnicalSkillIntoDB,
};
