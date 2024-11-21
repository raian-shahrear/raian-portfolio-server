import httpStatus from 'http-status-codes';
import { UserModel } from '../user/user.model';
import AppError from '../../errors/AppError';
import { TCertificates } from './certificates.interface';
import { CertificatesModel } from './certificates.model';

// create certificates
const createCertificateIntoDB = async (
  user: Record<string, unknown>,
  payload: TCertificates,
) => {
  const loggedInUser = await UserModel.findOne({ email: user.userEmail });
  if (!loggedInUser) {
    throw new AppError(httpStatus.FORBIDDEN, 'Unauthorized user!');
  }
  const result = await CertificatesModel.create(payload);
  return result;
};

// get all certificates
const getAllCertificatesFromDB = async () => {
  const result = await CertificatesModel.find();
  return result;
};

// get certificate by id
const getCertificateByIdFromDB = async (id: string) => {
  const result = await CertificatesModel.findById(id);
  return result;
};

// update certificate
const updateCertificateIntoDB = async (
  id: string,
  user: Record<string, unknown>,
  payload: Partial<TCertificates>,
) => {
  // checking logged in user
  const loggedInUser = await UserModel.findOne({ email: user.userEmail });
  if (!loggedInUser) {
    throw new AppError(httpStatus.FORBIDDEN, 'Unauthorized user!');
  }

  const result = await CertificatesModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

// delete certificate
const deleteCertificateIntoDB = async (
  id: string,
  user: Record<string, unknown>,
) => {
  // checking logged in user
  const loggedInUser = await UserModel.findOne({ email: user.userEmail });
  if (!loggedInUser) {
    throw new AppError(httpStatus.FORBIDDEN, 'Unauthorized user!');
  }

  const result = await CertificatesModel.findByIdAndDelete(id);
  return result;
};

export const CertificatesServices = {
  createCertificateIntoDB,
  getAllCertificatesFromDB,
  getCertificateByIdFromDB,
  updateCertificateIntoDB,
  deleteCertificateIntoDB,
};
