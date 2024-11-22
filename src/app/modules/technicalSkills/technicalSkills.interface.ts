export type TTechnical = {
  _id?: string;
  icon: string;
  iconColor: string;
  title: string;
};

export type TTechnicalSkills = {
  userEmail: string;
  expertise?: TTechnical[];
  comfortable?: TTechnical[];
  familiar?: TTechnical[];
  tools?: TTechnical[];
};
