import { myAxios, privateAxios } from "./helper";

export const getProductAvlQuantity = (productid) => {
  return myAxios
    .get(`/inventoryservice/inventory/getproductquantitybyid/${productid}`)
    .then((response) => response.data);
};

export const updateProductQuantity = (productid, quantity) => {
  return privateAxios
    .post(
      `/inventoryservice/inventory/updateproductquantity/product_id/${productid}/quantity/${quantity}`,
    )
    .then((response) => response.data);
};
