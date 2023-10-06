import { SERVER_URL } from "../config";

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export const requestPost = (data: object, url:string) => {
  return fetch(`${SERVER_URL}/${url}`, {
    method: "post",
    headers: headers,
    body: JSON.stringify(data),
  });
};

export const requestGet = (url: string) => {
  return fetch(`${SERVER_URL}/${url}`, {
    headers: headers,
  });
};
