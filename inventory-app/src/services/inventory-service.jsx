import { myAxios, privateAxios } from "./helper";

export const getProductAvlQuantity = (productid) => {
  return myAxios
    .get(`/inventoryservice/inventory/getproductquantitybyid/${productid}`)
    .then((response) => response.data);
};
