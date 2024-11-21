export type TTechnical = {
  _id?: string;
  icon: string;
  title: string;
};

export type TTechnicalSkills = {
  userEmail: string;
  expertise?: TTechnical[];
  comfortable?: TTechnical[];
  familiar?: TTechnical[];
  tools?: TTechnical[];
};