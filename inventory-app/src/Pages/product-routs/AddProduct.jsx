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
import { addProductFun } from "../../services/product-service";
import { toast } from "react-toastify";
import Base from "../../Component/Base";

import { getAllCategories } from "../../services/product-service";

import bgImage from "../../assets/product.jpg";

const AddProduct = () => {
  // Form State
  const [productData, setProductData] = useState({
    productname: "",
    category: "",
    productprice: "",
    quantity: "",
  });

  //Errors
  const [error, setError] = useState({
    errors: {},
    isError: false,
  });

  // Handle Input Change
  const handleChange = (event, field) => {
    setProductData({
      ...productData,
      [field]: event.target.value,
    });

    // 🔥 Remove error for that specific field
    setError((prev) => ({
      ...prev,
      errors: {
        ...prev.errors,
        [event.target.name]: null,
      },
    }));
  };

  // Handle Form Submit
  const submitForm = (event) => {
    event.preventDefault();

    console.log(productData);

    // API Call Here
    addProductFun(productData)
      .then((res) => {
        console.log(res);
        toast.success("Product Added Successfully");

        //RESET FORM
        resetForm();

        // 🔥 CLEAR ERRORS
        setError({
          errors: {},
          isError: false,
        });
      })
      .catch((error) => {
        // Ignore session expiry error
        if (error.response?.status === 401) {
          return;
        }

        console.log(error.response?.data);

        const res = error.response;

        if (res && res.data) {
          // Validation errors
          if (typeof res.data === "object") {
            setError({
              errors: res.data,
              isError: true,
            });
          }

          // Custom exception message
          else if (typeof res.data === "string") {
            toast.error(res.data);
          }
        } else {
          toast.error("Something went wrong");
        }
      });
  };

  // Reset Form
  const resetForm = () => {
    setProductData({
      productname: "",
      category: "",
      productprice: "",
      quantity: "",
    });
  };

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Unable to load categories");
      });
  }, []);

  return (
    <Base>
      <div
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
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
                  {/* Heading */}

                  <h3 className="text-center mb-4">Add Product</h3>

                  {/* Form */}

                  <Form onSubmit={submitForm}>
                    {/* Product Name */}

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

                    {/* Category */}

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

                    {/* Product Price */}

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

                    {/* Quantity */}

                    <FormGroup>
                      <Label for="quantity">Quantity</Label>

                      <Input
                        type="number"
                        id="quantity"
                        placeholder="Enter quantity"
                        value={productData.quantity}
                        onChange={(event) => handleChange(event, "quantity")}
                      />
                    </FormGroup>

                    {/* Buttons */}

                    <Container className="text-center mt-4">
                      <Button color="dark" type="submit" className="me-3">
                        Add Product
                      </Button>

                      <Button
                        color="secondary"
                        type="button"
                        onClick={resetForm}
                      >
                        Reset
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

export default AddProduct;
