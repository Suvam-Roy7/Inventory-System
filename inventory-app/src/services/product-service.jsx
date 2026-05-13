import { myAxios, privateAxios } from "./helper";

export const addProductFun = (product) => {
  return privateAxios
    .post("/productservice/products/createnewproduct", product)
    .then((response) => response.data);
};

export const getAllProducts = () => {
  return privateAxios
    .get("/productservice/products/getallproducts")
    .then((response) => response.data);
};

export const deleteProduct = (productid) => {
  return privateAxios
    .delete(`/productservice/products/admin/deleteproductbyid/${productid}`)
    .then((response) => response.data);
};

export const updateProduct = (productid, productData) => {
  return privateAxios
    .put(
      `/productservice/products/admin/updateproduct/${productid}`,
      productData,
    )
    .then((response) => response.data);
};

export const getAllCategories = () => {
  return myAxios
    .get("/productservice/products/categories")
    .then((response) => response.data);
};

export const getProductById = (productid) => {
  return privateAxios
    .get(`/productservice/products/getproducbyid/${productid}`)
    .then((response) => response.data);
};
