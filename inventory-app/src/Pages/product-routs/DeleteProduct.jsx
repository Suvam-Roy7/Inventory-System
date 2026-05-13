import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { deleteProduct } from "../../services/product-service";

const DeleteProduct = () => {
  const { productid } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    deleteProduct(productid)
      .then(() => {
        navigate("/product/allproducts");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return <h3 className="text-center mt-5">Deleting Product...</h3>;
};

export default DeleteProduct;
