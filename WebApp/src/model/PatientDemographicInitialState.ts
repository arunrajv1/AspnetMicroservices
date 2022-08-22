export type PatientDemographicInitialState = {
  address: {
    home_street1: string;
    home_street2: string;
    home_city: string;
    home_state: string;
    home_postal_code: string;
    home_country: string;
    home_phone: string;
    work_phone: string;
  };
  mrn: [{}];
  birth_sex: string;
  date_of_birth: string;
  ssn: string;
  race: string;
  marital_status: string;
  employment_status: string;
  student_status: string;
  deceased: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  suffix: string;
  id: string;
};
