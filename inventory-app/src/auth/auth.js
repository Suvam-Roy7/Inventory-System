import Login from "../Pages/SignIn";

// doLogin => data set to localstorage
export const doLogin = (jwtToken, next) => {
  localStorage.setItem("token", JSON.stringify(jwtToken));
  next();
};

// isLogIn
export const isLogIn = () => {
  let token = localStorage.getItem("token");

  if (token == null) {
    return false;
  }

  return true;
};

// doLogOut
export const doLogOut = (next) => {
  localStorage.removeItem("token");
  next();
};

// getCurrentUser
export const getCurrentUser = () => {
  if (isLogIn()) {
    return JSON.parse(localStorage.getItem("token")).user;
  } else {
    return undefined;
  }
};

// getCurrentToken
export const getCurrentToken = () => {
  if (isLogIn()) {
    return JSON.parse(localStorage.getItem("token")).token;
  } else {
    return null;
  }
};
