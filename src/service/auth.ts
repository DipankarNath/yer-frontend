import api from "@/api";
import { AxiosPromise } from "axios";

export const LOGIN = (payload: AuthPayload): AxiosPromise<AuthResponse> => {
  return api.post("/login", { ...payload });
};

export const REGISTER_PROVIDER = (
  payload: ProviderCreationPayload
): AxiosPromise<AuthResponse> => {
  return api.post("/admin", { ...payload });
};

export const REGISTER_PATIENTS = (
  payload: PatientCreationPayload
): AxiosPromise<PatientCreationResponse> => {
  return api.post("/user/register", { ...payload });
};
