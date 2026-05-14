import React, { useEffect, useMemo, useState } from "react";

import {
  Container,
  Table,
  Input,
  InputGroup,
  InputGroupText,
  Button,
  Card,
  CardBody,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
} from "reactstrap";

import { FaSearch, FaPlus, FaMinus, FaShoppingCart } from "react-icons/fa";
import { toast } from "react-toastify";

import Base from "../../Component/Base";
import bgImage from "../../assets/product.jpg";

import { getAllProducts } from "../../services/product-service";
import {
  addToCart,
  updateCartQuantity,
  getCartByUser,
  placeOrder,
} from "../../services/order-service";

import { getProductAvlQuantity } from "../../services/inventory-service";
import { getCurrentUser } from "../../auth/auth";

import "../../style/PlaceOrder.css";

const PlaceOrder = () => {
  const currentUser = getCurrentUser();
  const userid = currentUser.userid;

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState({});

  useEffect(() => {
    loadProducts();
    loadCart();
  }, []);

  /* ================= LOAD PRODUCTS ================= */
  const loadProducts = async () => {
    try {
      const data = await getAllProducts();

      const updatedProducts = await Promise.all(
        data.map(async (product) => {
          try {
            const qtyData = await getProductAvlQuantity(product.productid);

            return {
              ...product,
              availableQuantity: qtyData.quantity ?? qtyData,
            };
          } catch {
            return {
              ...product,
              availableQuantity: 0,
            };
          }
        }),
      );

      setProducts(updatedProducts);
    } catch {
      toast.error("Unable To Load Products");
    }
  };

  /* ================= LOAD CART ================= */
  const loadCart = () => {
    getCartByUser(userid)
      .then((data) => {
        const cartMap = {};

        data.productlist.forEach((item) => {
          cartMap[item.productid] = {
            productid: item.productid,
            quantity: item.productQuantity,
          };
        });

        setCart(cartMap);
      })
      .catch(() => {});
  };

  /* ================= PLACE ORDER ================= */
  const handlePlaceOrder = async () => {
    try {
      await placeOrder(userid);

      toast.success("Order Placed Successfully");

      setCart({});
      loadCart();
    } catch (error) {
      toast.error("Failed to place order");
    }
  };

  /* ================= FILTER PRODUCTS ================= */
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const value = search.toLowerCase();
      return (
        product.productname.toLowerCase().includes(value) ||
        product.category.toLowerCase().includes(value) ||
        product.productprice.toString().includes(value)
      );
    });
  }, [products, search]);

  /* ================= ADD TO CART ================= */
  const handleAddToCart = async (product) => {
    try {
      await addToCart(userid, {
        productid: product.productid,
        quantity: 1,
      });

      setCart((prev) => ({
        ...prev,
        [product.productid]: {
          productid: product.productid,
          quantity: (prev[product.productid]?.quantity || 0) + 1,
        },
      }));

      toast.success("Added To Cart");
    } catch {
      toast.error("Unable To Add Product");
    }
  };

  /* ================= INCREASE ================= */
  const increaseQuantity = (product) => {
    const qty = cart[product.productid]?.quantity || 0;

    updateCartQuantity(
      userid,
      { productid: product.productid, quantity: qty + 1 },
      "add",
    )
      .then(() => {
        setCart((prev) => ({
          ...prev,
          [product.productid]: {
            productid: product.productid,
            quantity: qty + 1,
          },
        }));
      })
      .catch(() => toast.error("Error"));
  };

  /* ================= DECREASE ================= */
  const decreaseQuantity = (product) => {
    const qty = cart[product.productid]?.quantity || 0;

    if (qty <= 1) {
      updateCartQuantity(
        userid,
        { productid: product.productid, quantity: 1 },
        "subtract",
      );

      setCart((prev) => {
        const updated = { ...prev };
        delete updated[product.productid];
        return updated;
      });

      return;
    }

    updateCartQuantity(
      userid,
      { productid: product.productid, quantity: qty - 1 },
      "subtract",
    ).then(() => {
      setCart((prev) => ({
        ...prev,
        [product.productid]: {
          productid: product.productid,
          quantity: qty - 1,
        },
      }));
    });
  };

  /* ================= MANUAL ================= */
  const handleManualQuantity = (value, product) => {
    let qty = Number(value);

    if (isNaN(qty) || qty < 1) return;

    if (qty > product.availableQuantity) {
      qty = product.availableQuantity;
      toast.warning("Stock limit reached");
    }

    updateCartQuantity(
      userid,
      { productid: product.productid, quantity: qty },
      "manual",
    )
      .then(() => {
        setCart((prev) => ({
          ...prev,
          [product.productid]: {
            productid: product.productid,
            quantity: qty,
          },
        }));
      })
      .catch(() => toast.error("Unable to update quantity"));
  };

  /* ================= TOTAL ================= */
  const totalAmount = products.reduce((total, product) => {
    const qty = cart[product.productid]?.quantity || 0;
    return total + qty * product.productprice;
  }, 0);

  return (
    <Base>
      <div
        className="placeorder-bg"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <Container fluid>
          <Row>
            {/* ================= PRODUCTS ================= */}
            <Col md={9}>
              <Card className="shadow custom-card">
                <CardBody>
                  <div className="d-flex justify-content-between mb-3">
                    <h3>Place Order</h3>

                    <InputGroup style={{ width: "300px" }}>
                      <InputGroupText>
                        <FaSearch />
                      </InputGroupText>
                      <Input
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </InputGroup>
                  </div>

                  <Table bordered className="mb-0 table-fixed header-table">
                    <thead className="table-head">
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                  </Table>

                  <div className="product-scroll">
                    <Table
                      bordered
                      hover
                      className="mb-0 table-fixed body-table"
                    >
                      <tbody>
                        {filteredProducts.map((product) => {
                          const cartQty =
                            cart[product.productid]?.quantity || 0;

                          return (
                            <tr key={product.productid}>
                              <td>{product.productid}</td>
                              <td>{product.productname}</td>
                              <td>{product.category}</td>
                              <td>₹ {product.productprice}</td>
                              <td>{product.availableQuantity}</td>

                              <td>
                                {!cartQty ? (
                                  <Button
                                    size="sm"
                                    color="dark"
                                    onClick={() => handleAddToCart(product)}
                                  >
                                    <FaShoppingCart /> Add
                                  </Button>
                                ) : (
                                  <div className="qty-box">
                                    <Button
                                      size="sm"
                                      color="danger"
                                      onClick={() => decreaseQuantity(product)}
                                    >
                                      <FaMinus />
                                    </Button>

                                    <Input
                                      type="number"
                                      value={cartQty}
                                      onChange={(e) =>
                                        handleManualQuantity(
                                          e.target.value,
                                          product,
                                        )
                                      }
                                      className="qty-input"
                                    />

                                    <Button
                                      size="sm"
                                      color="success"
                                      onClick={() => increaseQuantity(product)}
                                    >
                                      <FaPlus />
                                    </Button>
                                  </div>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col>

            {/* ================= CART ================= */}
            <Col md={3}>
              <Card className="shadow custom-card">
                <CardBody>
                  <h4>Cart</h4>

                  {Object.keys(cart).length === 0 ? (
                    <p>Cart Empty</p>
                  ) : (
                    <>
                      <div className="cart-scroll">
                        <ListGroup>
                          {products
                            .filter((p) => cart[p.productid])
                            .map((p) => (
                              <ListGroupItem
                                key={p.productid}
                                className="d-flex justify-content-between"
                              >
                                <div>
                                  <div>{p.productname}</div>
                                  <small>
                                    Qty: {cart[p.productid].quantity}
                                  </small>
                                </div>

                                <div className="cart-price">
                                  ₹{" "}
                                  {p.productprice * cart[p.productid].quantity}
                                </div>
                              </ListGroupItem>
                            ))}
                        </ListGroup>
                      </div>

                      <hr />

                      <div className="d-flex justify-content-between">
                        <h5>Total</h5>
                        <h5>₹ {totalAmount}</h5>
                      </div>

                      <Button
                        color="success"
                        className="w-100 mt-2"
                        onClick={handlePlaceOrder}
                      >
                        Place Order
                      </Button>
                    </>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </Base>
  );
};

export default PlaceOrder;
