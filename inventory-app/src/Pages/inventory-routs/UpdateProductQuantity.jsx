import React, { useEffect, useMemo, useState } from "react";
import {
  Container,
  Card,
  CardBody,
  Table,
  Input,
  InputGroup,
  InputGroupText,
  Button,
} from "reactstrap";

import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";

import Base from "../../Component/Base";

import { getAllProducts } from "../../services/product-service";
import { getProductAvlQuantity } from "../../services/inventory-service";

import { updateProductQuantity } from "../../services/inventory-service";

import bgImage from "../../assets/updateproduct.jpg";

const UpdateProductQuantity = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [stockInput, setStockInput] = useState({}); // {productId: value}

  /* ================= LOAD PRODUCTS ================= */
  const loadProducts = async () => {
    try {
      const data = await getAllProducts();

      const updated = await Promise.all(
        data.map(async (p) => {
          try {
            const qty = await getProductAvlQuantity(p.productid);

            return {
              ...p,
              availableQuantity: qty.quantity ?? qty,
            };
          } catch {
            return {
              ...p,
              availableQuantity: 0,
            };
          }
        }),
      );

      setProducts(updated);
    } catch (err) {
      toast.error("Failed to load products");
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  /* ================= SEARCH FILTER ================= */
  const filteredProducts = useMemo(() => {
    const value = search.toLowerCase();

    return products.filter((p) => {
      return (
        p.productid.toString().includes(value) ||
        p.productname.toLowerCase().includes(value) ||
        p.category.toLowerCase().includes(value)
      );
    });
  }, [products, search]);

  /* ================= HANDLE INPUT ================= */
  const handleInputChange = (productId, value) => {
    setStockInput((prev) => ({
      ...prev,
      [productId]: value,
    }));
  };

  /* ================= ADD STOCK ================= */
  const handleAddStock = async (product) => {
    const rawValue = stockInput[product.productid];

    if (rawValue === "" || rawValue === null || rawValue === undefined) {
      toast.warning("Enter stock quantity");
      return;
    }

    const qty = Number(rawValue);

    if (isNaN(qty)) {
      toast.warning("Enter valid number");
      return;
    }

    try {
      await updateProductQuantity(product.productid, qty);

      toast.success(
        qty >= 0 ? "Stock Added Successfully" : "Stock Reduced Successfully",
      );

      loadProducts();

      setStockInput((prev) => ({
        ...prev,
        [product.productid]: "",
      }));
    } catch (err) {
      toast.error("Failed to update stock");
    }
  };

  return (
    <Base>
      <div
        className="placeorder-bg"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <Container className="mt-4">
          <Card className="shadow">
            <CardBody>
              {/* ================= HEADER ================= */}
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4>Update Product Stock</h4>

                <InputGroup style={{ width: "300px" }}>
                  <InputGroupText>
                    <FaSearch />
                  </InputGroupText>

                  <Input
                    placeholder="Search by ID / Name / Category"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </InputGroup>
              </div>

              {/* ================= TABLE ================= */}
              <Table bordered hover responsive>
                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Available Stock</th>
                    <th>Add Stock</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredProducts.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center text-muted">
                        No Products Found
                      </td>
                    </tr>
                  ) : (
                    filteredProducts.map((product) => (
                      <tr key={product.productid}>
                        <td>{product.productid}</td>
                        <td>{product.productname}</td>
                        <td>{product.category}</td>
                        <td>{product.availableQuantity}</td>

                        {/* INPUT */}
                        <td>
                          <Input
                            type="number"
                            min="1"
                            placeholder="Enter stock"
                            value={stockInput[product.productid] || ""}
                            onChange={(e) =>
                              handleInputChange(
                                product.productid,
                                e.target.value,
                              )
                            }
                          />
                        </td>

                        {/* BUTTON */}
                        <td>
                          <Button
                            color="success"
                            size="sm"
                            onClick={() => handleAddStock(product)}
                          >
                            Add Stock
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Container>
      </div>
    </Base>
  );
};

export default UpdateProductQuantity;
