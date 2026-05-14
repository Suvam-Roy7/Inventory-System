import React, { useEffect, useMemo, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Table,
  Input,
  InputGroup,
  InputGroupText,
  Badge,
  ListGroup,
  ListGroupItem,
} from "reactstrap";

import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";

import Base from "../../Component/Base";
import "../../style/ViewInventory.css";

import { getAllProducts } from "../../services/product-service";
import { getProductAvlQuantity } from "../../services/inventory-service";

const ViewInventory = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

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
      toast.error("Failed to load inventory");
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

  /* ================= ALERT DATA ================= */
  const lowStock = products.filter(
    (p) => p.availableQuantity > 0 && p.availableQuantity < 20,
  );

  const outOfStock = products.filter((p) => p.availableQuantity === 0);

  return (
    <Base>
      <Container fluid className="mt-4">
        <Row>
          {/* ================= MAIN TABLE ================= */}
          <Col md={8}>
            <Card className="shadow">
              <CardBody>
                {/* HEADER */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4>Inventory</h4>

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

                {/* TABLE HEADER (FIXED) */}
                <Table className="header-table">
                  <thead className="table-dark">
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Available Stock</th>
                    </tr>
                  </thead>
                </Table>

                {/* TABLE BODY (SCROLLABLE) */}
                <div className="inventory-scroll">
                  <Table className="body-table" bordered hover>
                    <tbody>
                      {filteredProducts.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="text-center text-muted">
                            No Products Found
                          </td>
                        </tr>
                      ) : (
                        filteredProducts.map((p) => {
                          const isOut = p.availableQuantity === 0;
                          const isLow =
                            p.availableQuantity > 0 && p.availableQuantity < 20;

                          return (
                            <tr
                              key={p.productid}
                              className={
                                isOut
                                  ? "out-of-stock-row"
                                  : isLow
                                    ? "low-stock-row"
                                    : ""
                              }
                            >
                              <td>{p.productid}</td>

                              <td>{p.productname}</td>

                              <td>{p.category}</td>

                              <td>
                                {p.availableQuantity === 0 ? (
                                  <Badge color="danger" pill>
                                    0
                                  </Badge>
                                ) : p.availableQuantity < 20 ? (
                                  <Badge color="warning" pill>
                                    {p.availableQuantity}
                                  </Badge>
                                ) : (
                                  <Badge color="success" pill>
                                    {p.availableQuantity}
                                  </Badge>
                                )}
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>
          </Col>

          {/* ================= RIGHT PANEL ================= */}
          <Col md={4}>
            {/* LOW STOCK */}
            <Card className="shadow mb-3">
              <CardBody>
                <h5>⚠ Low Stock (&lt; 20)</h5>

                <div className="alert-scroll">
                  {lowStock.length === 0 ? (
                    <p className="text-muted">All products are well stocked</p>
                  ) : (
                    <ListGroup>
                      {lowStock.map((p) => (
                        <ListGroupItem key={p.productid}>
                          <div className="d-flex justify-content-between">
                            <div>
                              <div>{p.productname}</div>
                              <small className="text-muted">
                                ID: {p.productid}
                              </small>
                            </div>

                            <Badge color="warning">{p.availableQuantity}</Badge>
                          </div>
                        </ListGroupItem>
                      ))}
                    </ListGroup>
                  )}
                </div>
              </CardBody>
            </Card>

            {/* OUT OF STOCK */}
            <Card className="shadow">
              <CardBody>
                <h5>❌ Out of Stock</h5>

                <div className="outofstock-scroll">
                  {outOfStock.length === 0 ? (
                    <p className="text-muted">No out of stock products</p>
                  ) : (
                    <ListGroup>
                      {outOfStock.map((p) => (
                        <ListGroupItem key={p.productid}>
                          <div>
                            <div>{p.productname}</div>
                            <small className="text-muted">
                              ID: {p.productid}
                            </small>
                          </div>
                        </ListGroupItem>
                      ))}
                    </ListGroup>
                  )}
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Base>
  );
};

export default ViewInventory;
