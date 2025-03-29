type AuthPayload = {
  username: string;
  password: string;
};

type AuthResponse = {
  token: string;
  refreshToken: string;
};

type ProviderCreationPayload = {
  name: string;
  phone: string;
  email: string;
  password: string;
};

type ProviderCreationResponse = {
  id: string;
};

type PatientCreationPayload = {
  name: string;
  phone: string;
  email: string;
  dob: Date;
  gender: "MALE" | "FEMALE" | "OTHRE";
  password: string;
};

type PatientCreationResponse = {
  id: string;
};
