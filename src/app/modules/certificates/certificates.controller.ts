import httpStatus from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CertificatesServices } from './certificates.service';

// create certificate
const createCertificate = catchAsync(async (req, res) => {
  const result = await CertificatesServices.createCertificateIntoDB(req.user, req.body);

  // send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Certificate is created successfully!',
    data: result,
  });
});

// get all certificates
const getAllCertificates = catchAsync(async (req, res) => {
  const result = await CertificatesServices.getAllCertificatesFromDB();

  // send response
  res.status(result?.length ? httpStatus.OK : httpStatus.NOT_FOUND).json({
    success: result?.length ? true : false,
    statusCode: result?.length ? httpStatus.OK : httpStatus.NOT_FOUND,
    message: result?.length
      ? 'Certificates are retrieved successfully!'
      : 'No Data Found!',
    data: result,
  });
});

// get certificate by id
const getCertificateById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CertificatesServices.getCertificateByIdFromDB(id);

  // send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Certificate is retrieved successfully!',
    data: result,
  });
});

// update certificate skill
const updateCertificate = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CertificatesServices.updateCertificateIntoDB(id, req.user, req.body);

  // send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Certificate is updated successfully!',
    data: result,
  });
});

// delete certificate
const deleteCertificate = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CertificatesServices.deleteCertificateIntoDB(id, req.user);

  // send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Certificate is deleted successfully!',
    data: result,
  });
});

export const CertificatesControllers = {
    createCertificate,
    getAllCertificates,
    getCertificateById,
    updateCertificate,
    deleteCertificate
};
