import { myAxios } from "./helper";

export const signUpFun = (user) => {
  return myAxios
    .post("/userservice/users/createnewuser", user)
    .then((response) => response.data);
};

export const signInFun = (loginDetails) => {
  return myAxios
    .post("/authenticationservice/auth/login", loginDetails)
    .then((response) => response.data);
};
