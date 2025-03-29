import api from "@/api";
import { AxiosPromise } from "axios";

export const LOGIN = (payload: AuthPayload): AxiosPromise<AuthResponse> => {
  return api.post("/login", { ...payload });
};
