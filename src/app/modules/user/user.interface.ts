export type TUser = {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: 'admin' | 'user';
  address: string;
  profile: string;
  github?: string;
  linkedin?: string;
  facebook?: string;
  twitter?: string;
  youtube?: string;
  needPassChange?: boolean;
  passwordChangedAt?: Date;
};

export type TLoginUser = {
  email: string;
  password: string;
};
