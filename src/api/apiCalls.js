import axios from "axios";

export const signUp = (body) => {
  return axios.post("/users/save", body);
};

export const changeLanguage = (language) => {
  axios.defaults.headers["accept-language"] = language;
};
