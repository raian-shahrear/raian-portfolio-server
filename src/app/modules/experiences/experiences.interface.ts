export type TCompanyProject = {
  title: string;
  link: string;
  details?: string;
  technology?: string;
};

export type TExperience = {
  companyName: string;
  joiningDate: Date;
  endingDate?: Date;
  designation: string;
  employeeType: 'Full-time' | 'Part-time' | 'Contact' | 'Internship';
  locationType: 'On-site' | 'Hybrid' | 'Remote';
  responsibility: string;
  companyProject?: TCompanyProject[];
};
