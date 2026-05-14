import React, { useEffect, useMemo, useState } from "react";
import {
  Container,
  Card,
  CardBody,
  Input,
  InputGroup,
  InputGroupText,
  Button,
  Badge,
} from "reactstrap";

import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";

import { getProductById } from "../../services/product-service";
import Base from "../../Component/Base";
import { getCurrentUser } from "../../auth/auth";
import { getOrderHistory } from "../../services/order-service";

const OrderHistory = () => {
  const user = getCurrentUser();
  const userid = user.userid;

  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [productMap, setProductMap] = useState({});

  /* ================= LOAD ORDERS ================= */
  const loadOrders = async () => {
    try {
      const data = await getOrderHistory(userid);
      setOrders(data || []);
    } catch (err) {
      toast.error("Failed to load order history");
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  /* ================= FETCH PRODUCT NAMES ================= */
  useEffect(() => {
    const fetchProducts = async () => {
      const map = {};

      const allItems = orders.flatMap((o) => o.orderItems || []);

      await Promise.all(
        allItems.map(async (item) => {
          if (!map[item.product_id]) {
            const res = await getProductById(item.product_id);
            map[item.product_id] = res.productname;
          }
        }),
      );

      setProductMap(map);
    };

    if (orders.length) {
      fetchProducts();
    }
  }, [orders]);

  /* ================= FILTER ORDERS ================= */
  const filteredOrders = useMemo(() => {
    const now = new Date();

    return orders.filter((order) => {
      const orderDate = new Date(order.date);

      const matchSearch =
        order.orderid.toString().includes(search) ||
        order.status.toLowerCase().includes(search.toLowerCase());

      let matchFilter = true;

      if (filter === "THIS_MONTH") {
        matchFilter =
          orderDate.getMonth() === now.getMonth() &&
          orderDate.getFullYear() === now.getFullYear();
      }

      if (filter === "LAST_MONTH") {
        const lastMonth = new Date();
        lastMonth.setMonth(now.getMonth() - 1);

        matchFilter =
          orderDate.getMonth() === lastMonth.getMonth() &&
          orderDate.getFullYear() === lastMonth.getFullYear();
      }

      return matchSearch && matchFilter;
    });
  }, [orders, search, filter]);

  return (
    <Base>
      <Container className="mt-4">
        <Card className="shadow">
          <CardBody>
            {/* HEADER */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4>Order History</h4>

              <InputGroup style={{ width: "300px" }}>
                <InputGroupText>
                  <FaSearch />
                </InputGroupText>
                <Input
                  placeholder="Search Order ID / Status"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </InputGroup>
            </div>

            {/* FILTER */}
            <div className="mb-3">
              <Button
                size="sm"
                color={filter === "ALL" ? "primary" : "secondary"}
                onClick={() => setFilter("ALL")}
                className="me-2"
              >
                All
              </Button>

              <Button
                size="sm"
                color={filter === "THIS_MONTH" ? "primary" : "secondary"}
                onClick={() => setFilter("THIS_MONTH")}
                className="me-2"
              >
                This Month
              </Button>

              <Button
                size="sm"
                color={filter === "LAST_MONTH" ? "primary" : "secondary"}
                onClick={() => setFilter("LAST_MONTH")}
              >
                Last Month
              </Button>
            </div>

            {/* ORDERS */}
            {filteredOrders.length === 0 ? (
              <p className="text-center text-muted">No Orders Found</p>
            ) : (
              filteredOrders.map((order) => (
                <Card key={order.orderid} className="mb-3 border-0 shadow-sm">
                  <CardBody>
                    {/* ORDER HEADER */}
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="mb-1">Order #{order.orderid}</h6>
                        <small className="text-muted">
                          {new Date(order.date).toLocaleString()}
                        </small>
                      </div>

                      <div className="text-end">
                        <Badge
                          color={
                            order.status === "Completed" ? "success" : "warning"
                          }
                        >
                          {order.status}
                        </Badge>

                        <div className="mt-1 fw-bold">
                          ₹ {order.totalamount}
                        </div>
                      </div>
                    </div>

                    {/* VIEW BUTTON */}
                    <div className="mt-3">
                      <Button
                        size="sm"
                        color="info"
                        onClick={() =>
                          setExpandedOrder(
                            expandedOrder === order.orderid
                              ? null
                              : order.orderid,
                          )
                        }
                      >
                        {expandedOrder === order.orderid
                          ? "Hide Items"
                          : "View Items"}
                      </Button>
                    </div>

                    {/* ORDER ITEMS */}
                    {expandedOrder === order.orderid && (
                      <div className="mt-3 p-3 bg-light rounded">
                        {order.orderItems.map((item) => (
                          <div
                            key={item.orderitemid}
                            className="d-flex justify-content-between border-bottom py-2"
                          >
                            <div>
                              <div className="fw-semibold">
                                {" "}
                                {productMap[item.product_id] || "Loading..."}
                              </div>
                              <small className="text-muted">
                                Qty: {item.quantity}
                              </small>
                            </div>

                            <div className="text-end">
                              <div>₹ {item.price}</div>
                              <small className="text-muted">
                                Total: ₹ {item.price * item.quantity}
                              </small>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardBody>
                </Card>
              ))
            )}
          </CardBody>
        </Card>
      </Container>
    </Base>
  );
};

export default OrderHistory;
