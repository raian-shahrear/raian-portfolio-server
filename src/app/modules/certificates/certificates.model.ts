import { model, Schema } from 'mongoose';
import { TCertificates } from './certificates.interface';

const certificatesSchema = new Schema<TCertificates>(
  {
    title: {
      type: String,
      required: true,
    },
    link: {
      type: String,
    },
    organization: {
      type: String,
    },
    time: {
      type: Date,
    },
  },
  { timestamps: true },
);

export const CertificatesModel = model<TCertificates>(
  'Certificates',
  certificatesSchema,
);
