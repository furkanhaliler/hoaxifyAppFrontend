import axios from "axios";

export const signUp = (body) => {
  return axios.post("/users/save", body, {headers: {'accept-language': 'en'}});
};
