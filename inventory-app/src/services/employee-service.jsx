import { myAxios, privateAxios } from "./helper";

export const promoteUser = (user) => {
  return privateAxios
    .put("/userservice/users/admin/promoteemployee", user)
    .then((response) => response.data);
};

export const getRoles = () => {
  return myAxios
    .get("/userservice/users/getRoles")
    .then((response) => response.data);
};

export const getAllEmployee = () => {
  return privateAxios
    .get("/userservice/users/getAllEmployee")
    .then((response) => response.data);
};

export const addEmployee = (user) => {
  return privateAxios
    .post("/userservice/users/createnewuser", user)
    .then((response) => response.data);
};

export const deleteEmployee = (email) => {
  return privateAxios
    .delete(`/userservice/users/admin/deleteUserByEmail/${email}`)
    .then((response) => response.data);
};

export const editEmployee = (email, user) => {
  return privateAxios
    .put(`/userservice/users/updateUser/${email}`, user)
    .then((response) => response.data);
};
