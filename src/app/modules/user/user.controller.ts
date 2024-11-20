import config from '../../config';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';
import httpStatus from 'http-status-codes';

// register user
const registerUser = catchAsync(async (req, res) => {
  const result = await UserServices.registerUserIntoDB(req.body);

  // send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User is registered successfully!',
    data: result,
  });
});

// login user
const loginUser = catchAsync(async (req, res) => {
  const result = await UserServices.loginUser(req.body);

  // set refresh token to the cookie
  const { refreshToken, accessToken } = result.token;
  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: true,
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  // send response
  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'User logged in successfully!',
    data: { accessToken, refreshToken },
  });
});

// update user
const updateUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.updateUserIntoDB(id, req.user, req.body);

  // send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User is updated successfully!',
    data: result,
  });
});

// get all users
const getAllUsers = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUsersFromDB();

  // send response
  res.status(result?.length ? httpStatus.OK : httpStatus.NOT_FOUND).json({
    success: result?.length ? true : false,
    statusCode: result?.length ? httpStatus.OK : httpStatus.NOT_FOUND,
    message: result?.length
      ? 'Users are retrieved successfully!'
      : 'No Data Found!',
    data: result,
  });
});

//   get user by id
const getUserById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.getUserByIdFromDB(id);

  // send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User is retrieved successfully!',
    data: result,
  });
});

// update user email
const updateUserEmail = catchAsync(async (req, res) => {
  const result = await UserServices.updateUserEmailIntoDB(req.user, req.body);

  // send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User email is updated successfully!',
    data: result,
  });
});

// change password
const changePassword = catchAsync(async (req, res) => {
  const result = await UserServices.changePasswordIntoDB(req.user, req.body);

  // send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Password is changed successfully!',
    data: result,
  });
});

// get accessToken from refreshToken
const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await UserServices.refreshToken(refreshToken);

  // send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Access token is retrieved successfully!',
    data: result,
  });
});

export const UserControllers = {
  registerUser,
  loginUser,
  updateUser,
  getAllUsers,
  getUserById,
  updateUserEmail,
  changePassword,
  refreshToken,
};
