const patientAddressFields = [
  {
    labelText: "street1",
    labelFor: "txtStreet1",
    id: "txtStreet1",
    name: "home_street1",
    type: "text",
    autoComplete: "home_street1",
    isRequired: true,
    placeholder: "street1",
    maxLength: 30,
    minLength: 4,
    errorMessage: ""
  },
  {
    labelText: "street2",
    labelFor: "txtStreet2",
    id: "txtStreet2",
    name: "home_street2",
    type: "text",
    autoComplete: "home_street2",
    isRequired: false,
    placeholder: "street2",
    maxLength: 30,
    minLength: 4,
    errorMessage: ""
  },/*
  {
    labelText: "City",
    labelFor: "txtCity",
    id: "txtCity",
    name: "home_city",
    type: "text",
    autoComplete: "home_city",
    isRequired: true,
    placeholder: "City",
  },
  {
    labelText: "State",
    labelFor: "txtState",
    id: "txtState",
    name: "home_state",
    type: "text",
    autoComplete: "home_state",
    isRequired: true,
    placeholder: "State",
  },
  {
    labelText: "Country",
    labelFor: "txtCountry",
    id: "txtCountry",
    name: "home_country",
    type: "text",
    autoComplete: "home_country",
    isRequired: true,
    placeholder: "Country",
  },*/
  {
    labelText: "postal_code",
    labelFor: "txtPostalCode",
    id: "txtPostalCode",
    name: "home_postal_code",
    type: "text",
    autoComplete: "home_postal_code",
    isRequired: true,
    placeholder: "postal_code_placeholder",
    maxLength: 5,
    minLength: 5,
    errorMessage: ""
  },
];

const patientContactFields = [
  {
    labelText: "home",
    labelFor: "txtHomePhone",
    id: "txtHomePhone",
    name: "home_phone",
    type: "text",
    maxLength: 10,
    autoComplete: "home_phone",
    isRequired: true,
    placeholder: "home",
    countryCode: "",
    errorMessage: ""
  },
  {
    labelText: "work",
    labelFor: "txtWorkPhone",
    id: "txtWorkPhone",
    name: "work_phone",
    type: "text",
    maxLength: 10,
    autoComplete: "work_phone",
    isRequired: false,
    placeholder: "work",
    countryCode: "",
    errorMessage: ""
  },
];

const patientNameFields = [
  {
    labelText: "First Name",
    labelFor: "txtFirstName",
    id: "txtFirstName",
    name: "first_name",
    type: "text",
    maxLength: 20,
    autoComplete: "first_name",
    isRequired: true,
    placeholder: "first_name",
    errorMessage: ""
  },
  {
    labelText: "Middle Name",
    labelFor: "txtMiddleName",
    id: "txtMiddleName",
    name: "middle_name",
    type: "text",
    maxLength: 20,
    autoComplete: "middle_name",
    isRequired: false,
    placeholder: "middle_name",
  },
  {
    labelText: "Last Name",
    labelFor: "txtLastName",
    id: "txtLastName",
    name: "last_name",
    type: "text",
    maxLength: 20,
    autoComplete: "last_name",
    isRequired: true,
    placeholder: "last_name",
    errorMessage: ""
  },
  {
    labelText: "Suffix",
    labelFor: "txtSuffix",
    id: "txtSuffix",
    name: "suffix",
    type: "text",
    maxLength: 10,
    autoComplete: "suffix",
    isRequired: false,
    placeholder: "suffix",
    errorMessage: ""
  }
];

const patientSearchFields = [
  {
    labelText: "Name",
    labelFor: "txtName",
    id: "txtName",
    name: "name",
    type: "text",
    maxLength: 10,
    autoComplete: "name",
    isRequired: false,
    placeholder: "name",
  },
  {
    labelText: "MRN",
    labelFor: "txtMRN",
    id: "txtMRN",
    name: "mrn",
    type: "text",
    maxLength: 20,
    autoComplete: "mrn",
    isRequired: false,
    placeholder: "mrn",
  },
  {
    labelText: "Id",
    labelFor: "txtId",
    id: "txtId",
    name: "id",
    type: "text",
    maxLength: 5,
    autoComplete: "id",
    isRequired: false,
    placeholder: "id",
  }
]

const employerFields = [
  {
    labelText: "Employer Name",
    labelFor: "empName",
    id: "empName",
    name: "emp_name",
    type: "text",
    autoComplete: "emp_name",
    isRequired: true,
    placeholder: "Employer Name",
  },
  {
    labelText: "Employer ID",
    labelFor: "empId",
    id: "empId",
    name: "emp_id",
    type: "text",
    autoComplete: "emp_id",
    isRequired: true,
    placeholder: "Employer ID",
  },
];

const employerAddressFields = [
  {
    labelText: "Street 1",
    labelFor: "txtStreet1",
    id: "txtStreet1",
    name: "home_street1",
    type: "text",
    autoComplete: "home_street1",
    isRequired: true,
    placeholder: "Street 1",
  },
  {
    labelText: "Street 2",
    labelFor: "txtStreet2",
    id: "txtStreet2",
    name: "home_street2",
    type: "text",
    autoComplete: "home_street2",
    isRequired: false,
    placeholder: "Street 2",
  },
  {
    labelText: "City",
    labelFor: "txtCity",
    id: "txtCity",
    name: "home_city",
    type: "text",
    autoComplete: "home_city",
    isRequired: true,
    placeholder: "City",
  },
  {
    labelText: "State",
    labelFor: "txtState",
    id: "txtState",
    name: "home_state",
    type: "text",
    autoComplete: "home_state",
    isRequired: true,
    placeholder: "State",
  },
  {
    labelText: "Country",
    labelFor: "txtCountry",
    id: "txtCountry",
    name: "home_country",
    type: "text",
    autoComplete: "home_country",
    isRequired: true,
    placeholder: "Country",
  },
  {
    labelText: "Postal Code",
    labelFor: "txtPostalCode",
    id: "txtPostalCode",
    name: "home_postal_code",
    type: "text",
    autoComplete: "home_postal_code",
    isRequired: true,
    placeholder: "Postal Code",
  },
];

const countryStateCity = [
  {
    labelText: "State",
    labelFor: "txtState",
    id: "txtState",
    name: "home_state",
    type: "text",
    autoComplete: "home_state",
    isRequired: true,
    placeholder: "State",
  },
  {
    labelText: "City",
    labelFor: "txtCity",
    id: "txtCity",
    name: "home_city",
    type: "text",
    autoComplete: "home_city",
    isRequired: true,
    placeholder: "City",
  },
  // {
  //   labelText: "Country",
  //   labelFor: "txtCountry",
  //   id: "txtCountry",
  //   name: "home_country",
  //   type: "text",
  //   autoComplete: "home_country",
  //   isRequired: true,
  //   placeholder: "Country",
  // }
]

export { patientAddressFields, patientContactFields, patientNameFields, patientSearchFields, employerFields, employerAddressFields, countryStateCity };
