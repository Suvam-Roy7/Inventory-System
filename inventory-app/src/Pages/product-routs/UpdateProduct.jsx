import React, { useEffect, useState } from "react";

import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";

import { useNavigate, useParams } from "react-router-dom";

import Base from "../../Component/Base";

import bgImage from "../../assets/product.jpg";

import { toast } from "react-toastify";

import {
  updateProduct,
  getAllCategories,
  getProductById,
} from "../../services/product-service";

const UpdateProduct = () => {
  // =========================================
  // PARAMS & NAVIGATION
  // =========================================

  const { productid } = useParams();

  const navigate = useNavigate();

  // =========================================
  // STATES
  // =========================================

  const [productData, setProductData] = useState({
    productname: "",
    category: "",
    productprice: "",
  });

  const [categories, setCategories] = useState([]);

  // =========================================
  // LOAD PRODUCT
  // =========================================

  useEffect(() => {
    loadProduct();
    loadCategories();
  }, []);

  const loadProduct = () => {
    getProductById(productid)
      .then((data) => {
        setProductData({
          productname: data.productname,
          category: data.category,
          productprice: data.productprice,
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Unable to load product");
      });
  };

  // =========================================
  // LOAD CATEGORIES
  // =========================================

  const loadCategories = () => {
    getAllCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Unable to load categories");
      });
  };

  // =========================================
  // HANDLE CHANGE
  // =========================================

  const handleChange = (event, field) => {
    setProductData({
      ...productData,
      [field]: event.target.value,
    });
  };

  // =========================================
  // UPDATE PRODUCT
  // =========================================

  const submitForm = (event) => {
    event.preventDefault();

    updateProduct(productid, productData)
      .then((response) => {
        toast.success(`${response.productname} Updated Successfully`);

        navigate("/product/allproducts");
      })
      .catch((error) => {
        console.log(error);

        if (error.response?.status === 401) {
          return;
        }

        toast.error("Failed To Update Product");
      });
  };

  // =========================================
  // RESET FORM
  // =========================================

  const resetForm = () => {
    loadProduct();
  };

  return (
    <Base>
      <div
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100%",
          padding: "30px",
        }}
      >
        <Container>
          <Row className="justify-content-center">
            <Col md={6}>
              <Card
                className="shadow"
                style={{
                  borderRadius: "15px",
                  backgroundColor: "rgba(255,255,255,0.95)",
                }}
              >
                <CardBody>
                  {/* HEADING */}

                  <h3 className="text-center mb-4">Update Product</h3>

                  {/* FORM */}

                  <Form onSubmit={submitForm}>
                    {/* PRODUCT NAME */}

                    <FormGroup>
                      <Label for="productname">Product Name</Label>

                      <Input
                        type="text"
                        id="productname"
                        placeholder="Enter product name"
                        value={productData.productname}
                        onChange={(event) => handleChange(event, "productname")}
                      />
                    </FormGroup>

                    {/* CATEGORY */}

                    <FormGroup>
                      <Label for="category">Category</Label>

                      <Input
                        type="select"
                        id="category"
                        value={productData.category}
                        onChange={(event) => handleChange(event, "category")}
                      >
                        <option value="">-- Select Category --</option>

                        {categories.map((category, index) => (
                          <option key={index} value={category}>
                            {category.replaceAll("_", " ")}
                          </option>
                        ))}
                      </Input>
                    </FormGroup>

                    {/* PRODUCT PRICE */}

                    <FormGroup>
                      <Label for="productprice">Product Price</Label>

                      <Input
                        type="number"
                        id="productprice"
                        placeholder="Enter product price"
                        value={productData.productprice}
                        onChange={(event) =>
                          handleChange(event, "productprice")
                        }
                      />
                    </FormGroup>

                    {/* BUTTONS */}

                    <Container className="text-center mt-4">
                      <Button color="dark" type="submit" className="me-3">
                        Update Product
                      </Button>

                      <Button
                        color="secondary"
                        type="button"
                        onClick={resetForm}
                        className="me-3"
                      >
                        Reset
                      </Button>

                      <Button
                        color="danger"
                        type="button"
                        onClick={() => navigate("/product/allproducts")}
                      >
                        Cancel
                      </Button>
                    </Container>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </Base>
  );
};

export default UpdateProduct;
