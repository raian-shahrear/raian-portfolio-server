import AppError from '../../errors/AppError';
import { TLoginUser, TUser } from './user.interface';
import { UserModel } from './user.model';
import httpStatus from 'http-status-codes';
import bcrypt from 'bcrypt';
import { crateToken } from './user.utils';
import config from '../../config';
import jwt, { JwtPayload } from 'jsonwebtoken';

// register user
const registerUserIntoDB = async (payload: TUser) => {
  const isUserExist = await UserModel.findOne({ email: payload.email });
  if (isUserExist) {
    throw new AppError(httpStatus.CONFLICT, 'User is already registered!');
  }

  const result = await UserModel.create(payload);
  const newUser = await UserModel.findById(result._id).select(['-password']);
  return newUser;
};

// login user
const loginUser = async (payload: TLoginUser) => {
  // checking user existed or not
  const isUserExist = await UserModel.findOne({ email: payload.email }).select([
    '+password',
  ]);
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }
  // checking password matched or not
  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    isUserExist.password,
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password does not matched!');
  }

  // create access_token and sent to the user
  const jwtPayload = {
    id: isUserExist._id,
    userEmail: isUserExist.email,
    userName: isUserExist.name,
    role: isUserExist.role,
  };
  const accessToken = crateToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expire_in as string,
  );
  // create refresh_token and sent to a client
  const refreshToken = crateToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expire_in as string,
  );

  return {
    token: { accessToken, refreshToken },
  };
};

// update user
const updateUserIntoDB = async (
  id: string,
  user: Record<string, unknown>,
  payload: Partial<TUser>,
) => {
  // checking logged in user
  const loggedInUser = await UserModel.findOne({ email: user.userEmail });
  if (loggedInUser?._id.toString() !== id) {
    throw new AppError(httpStatus.FORBIDDEN, 'Unauthorized user!');
  }

  // checking the id exist or not
  const isUserExist = await UserModel.findById(id);
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not exist!');
  }

  const result = await UserModel.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

// get all users
const getAllUsersFromDB = async () => {
  const result = await UserModel.find();

  return result;
};

// get user by id
const getUserByIdFromDB = async (id: string) => {
  const result = await UserModel.findById(id);

  return result;
};

// update user email
const updateUserEmailIntoDB = async (
  user: Record<string, unknown>,
  payload: Partial<TUser>,
) => {
  const loggedInUser = await UserModel.findOne({ email: user.userEmail });
  if (!loggedInUser) {
    throw new AppError(httpStatus.FORBIDDEN, 'Unauthorized user!');
  }
  const result = await UserModel.findByIdAndUpdate(loggedInUser?._id, payload, {
    new: true,
  });
  return result;
};

// change password
const changePasswordIntoDB = async (
  user: Record<string, unknown>,
  payload: { oldPassword: string; newPassword: string },
) => {
  // checking user is exist or not by userId
  const loggedInUser = await UserModel.findOne({
    email: user.userEmail,
  }).select('+password');
  if (!loggedInUser) {
    throw new AppError(httpStatus.FORBIDDEN, 'Unauthorized user!');
  }
  // checking password matched or not
  const isPasswordMatched = await bcrypt.compare(
    payload?.oldPassword,
    loggedInUser.password,
  );

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password does not matched!');
  }

  // hash newPassword
  const hashedNewPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await UserModel.findOneAndUpdate(
    {
      email: user.userEmail,
      role: user.role,
    },
    {
      password: hashedNewPassword,
      needPassChange: false,
      passwordChangedAt: new Date(),
    },
  );
  return null;
};

// get accessToken from refreshToken
const refreshToken = async (token: string) => {
  // chucking a token sent from the client or not
  if (!token) {
    throw new AppError(httpStatus.FORBIDDEN, 'You are not an authorized user!');
  }

  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string,
  ) as JwtPayload;

  const { userEmail, iat } = decoded;

  // checking user is exist or not by userId
  const existedUser = await UserModel.findOne({ email: userEmail });
  if (!existedUser) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }
  // checking token issuedAt before passwordChanged (if passwordChanged is bigger than issuedAt)
  if (existedUser?.passwordChangedAt && iat) {
    const passwordChangedAt =
      new Date(existedUser?.passwordChangedAt).getTime() / 1000;
    if (passwordChangedAt > iat) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You are unauthorized! Please login again!',
      );
    }
  }

  // create access_token and sent to a client
  const jwtPayload = {
    id: existedUser._id,
    userEmail: existedUser.email,
    userName: existedUser.name,
    role: existedUser.role,
  };
  const accessToken = crateToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expire_in as string,
  );

  return { accessToken };
};

export const UserServices = {
  registerUserIntoDB,
  loginUser,
  updateUserIntoDB,
  getAllUsersFromDB,
  getUserByIdFromDB,
  updateUserEmailIntoDB,
  changePasswordIntoDB,
  refreshToken,
};
