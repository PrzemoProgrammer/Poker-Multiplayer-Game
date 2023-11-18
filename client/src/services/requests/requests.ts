import { requestGet, requestPost } from "./helper/helper";

export const AUTHENTICATION = (data:object) => {
  return requestPost(data, "authentication");
};

export const REGISTRATION = (data: object) => {
  return requestPost(data, "registration");
};
