import { myAxios, privateAxios } from "./helper";

export const addToCart = (userid, productinfo) => {
  return privateAxios
    .post(`/orderservice/orders/cart/addproducttocart/${userid}`, productinfo)
    .then((response) => response.data);
};

export const updateCartQuantity = (userid, productinfo, operation) => {
  return privateAxios
    .put(
      `/orderservice/orders/updatequantity/${userid}/${operation}`,
      productinfo,
    )
    .then((response) => response.data);
};

export const getCartByUser = async (userid) => {
  const response = await privateAxios.get(
    `/orderservice/orders/getcart/${userid}`,
  );
  return response.data;
};

export const placeOrder = (userid) => {
  return privateAxios
    .post(`/orderservice/orders/placeneworder/${userid}`)
    .then((response) => response.data);
};

export const getOrderHistory = (userid) => {
  return privateAxios
    .get(`/orderservice/orders/getorderhistoryofuser/${userid}`)
    .then((response) => response.data);
};

export const getMonthilySales = () => {
  return privateAxios
    .get(`/orderservice/orders/getMonthilySales`)
    .then((response) => response.data);
};
