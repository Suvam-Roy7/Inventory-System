import React, { useEffect, useMemo, useState } from "react";

import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Table,
  Badge,
  Progress,
  Spinner,
} from "reactstrap";

import {
  FaBoxOpen,
  FaExclamationTriangle,
  FaWarehouse,
  FaShoppingCart,
  FaRupeeSign,
  FaChartLine,
  FaUsers,
} from "react-icons/fa";

import Base from "../../Component/Base";
import "../../style/Dashboard.css";

import { getAllProducts } from "../../services/product-service";
import { getProductAvlQuantity } from "../../services/inventory-service";
import { getMonthilySales } from "../../services/order-service";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= LOAD DATA ================= */

  const loadDashboard = async () => {
    try {
      /* PRODUCTS */
      const data = await getAllProducts();

      const updatedProducts = await Promise.all(
        data.map(async (p) => {
          try {
            const qtyData = await getProductAvlQuantity(p.productid);

            return {
              ...p,
              availableQuantity: qtyData.quantity ?? qtyData,
            };
          } catch {
            return {
              ...p,
              availableQuantity: 0,
            };
          }
        }),
      );

      setProducts(updatedProducts);

      /* SALES DATA */
      const salesResponse = await getMonthilySales();

      /*
        Backend returns:
        {
          JANUARY: 45000,
          FEBRUARY: 62000
        }
      */

      const monthOrder = [
        "JANUARY",
        "FEBRUARY",
        "MARCH",
        "APRIL",
        "MAY",
        "JUNE",
        "JULY",
        "AUGUST",
        "SEPTEMBER",
        "OCTOBER",
        "NOVEMBER",
        "DECEMBER",
      ];

      const formattedSales = monthOrder.map((month) => ({
        month: month.substring(0, 3),
        sales: salesResponse[month] || 0,
      }));

      setSalesData(formattedSales);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  /* ================= CALCULATIONS ================= */

  const totalProducts = products.length;

  const totalStock = products.reduce((sum, p) => sum + p.availableQuantity, 0);

  const lowStockProducts = products.filter((p) => p.availableQuantity < 20);

  const outOfStockProducts = products.filter((p) => p.availableQuantity === 0);

  const healthyStock = products.filter((p) => p.availableQuantity >= 20);

  const inventoryValue = products.reduce(
    (sum, p) => sum + p.productprice * p.availableQuantity,
    0,
  );

  /* ================= CATEGORY STATS ================= */

  const categoryStats = useMemo(() => {
    const map = {};

    products.forEach((p) => {
      if (!map[p.category]) {
        map[p.category] = 0;
      }

      map[p.category] += p.availableQuantity;
    });

    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, [products]);

  /* ================= EMPLOYEE ATTENDANCE ================= */

  const totalEmployees = 42;
  const presentEmployees = 37;
  const absentEmployees = totalEmployees - presentEmployees;

  /* ================= SALES GRAPH ================= */

  const maxSales =
    salesData.length > 0 ? Math.max(...salesData.map((d) => d.sales)) : 1;

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <Base>
        <div className="dashboard-loader">
          <Spinner color="dark" />
        </div>
      </Base>
    );
  }

  return (
    <Base>
      <div className="dashboard-bg">
        <Container fluid>
          {/* ================= WELCOME ================= */}

          <div className="dashboard-welcome">
            <h2>Welcome To Inventory Dashboard</h2>

            <p>
              Monitor stock levels, inventory health, employee attendance,
              category performance and monthly sales analytics.
            </p>
          </div>

          {/* ================= TOP CARDS ================= */}

          <Row className="g-4 mb-4">
            {/* PRODUCTS */}
            <Col lg={3} md={6}>
              <Card className="stats-card">
                <CardBody>
                  <div className="stats-left">
                    <h6>Total Products</h6>
                    <h3>{totalProducts}</h3>
                  </div>

                  <FaBoxOpen className="stats-icon text-primary" />
                </CardBody>
              </Card>
            </Col>

            {/* STOCK */}
            <Col lg={3} md={6}>
              <Card className="stats-card">
                <CardBody>
                  <div className="stats-left">
                    <h6>Available Stock</h6>
                    <h3>{totalStock}</h3>
                  </div>

                  <FaWarehouse className="stats-icon text-success" />
                </CardBody>
              </Card>
            </Col>

            {/* ALERTS */}
            <Col lg={3} md={6}>
              <Card className="stats-card">
                <CardBody>
                  <div className="stats-left">
                    <h6>Low Stock Alerts</h6>
                    <h3>{lowStockProducts.length}</h3>
                  </div>

                  <FaExclamationTriangle className="stats-icon text-warning" />
                </CardBody>
              </Card>
            </Col>

            {/* VALUE */}
            <Col lg={3} md={6}>
              <Card className="stats-card">
                <CardBody>
                  <div className="stats-left">
                    <h6>Inventory Value</h6>
                    <h3>₹ {inventoryValue}</h3>
                  </div>

                  <FaRupeeSign className="stats-icon text-dark" />
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/* ================= MAIN SECTION ================= */}

          <Row className="g-4">
            {/* LEFT SIDE */}
            <Col lg={8}>
              {/* SALES GRAPH */}

              <Card className="dashboard-table-card mb-4">
                <CardBody>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                      <h5 className="fw-bold mb-1">📈 Monthly Sales Trend</h5>

                      <small className="text-muted">
                        Total sales amount generated per month (₹)
                      </small>
                    </div>

                    <div className="sales-year-badge">
                      {new Date().getFullYear()}
                    </div>
                  </div>

                  <div className="custom-sales-chart">
                    {salesData.map((item, index) => {
                      const height =
                        maxSales > 0 ? (item.sales / maxSales) * 200 : 20;

                      return (
                        <div className="chart-bar-item" key={index}>
                          {/* VALUE */}
                          <div className="chart-value">
                            ₹{item.sales.toLocaleString()}
                          </div>

                          {/* BAR */}
                          <div
                            className="chart-bar"
                            style={{
                              height: `${height}px`,
                            }}
                          ></div>

                          {/* MONTH */}
                          <div className="chart-month">{item.month}</div>
                        </div>
                      );
                    })}
                  </div>
                </CardBody>
              </Card>

              {/* LOW STOCK TABLE */}

              <Card className="dashboard-table-card">
                <CardBody>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="fw-bold mb-0">⚠ Low Stock Products</h5>

                    <Badge color="warning">
                      {lowStockProducts.length} Alerts
                    </Badge>
                  </div>

                  <div className="dashboard-scroll">
                    <Table hover responsive className="align-middle mb-0">
                      <thead className="dashboard-table-header">
                        <tr>
                          <th>ID</th>
                          <th>Product</th>
                          <th>Category</th>
                          <th>Price</th>
                          <th>Stock</th>
                          <th>Status</th>
                        </tr>
                      </thead>

                      <tbody>
                        {lowStockProducts.length === 0 ? (
                          <tr>
                            <td colSpan="6" className="text-center text-muted">
                              All products are sufficiently stocked
                            </td>
                          </tr>
                        ) : (
                          lowStockProducts.map((p) => (
                            <tr
                              key={p.productid}
                              className={
                                p.availableQuantity === 0
                                  ? "out-stock-row"
                                  : "low-stock-row"
                              }
                            >
                              <td>{p.productid}</td>

                              <td>{p.productname}</td>

                              <td>{p.category}</td>

                              <td>₹ {p.productprice}</td>

                              <td>
                                <Badge
                                  color={
                                    p.availableQuantity === 0
                                      ? "danger"
                                      : "warning"
                                  }
                                >
                                  {p.availableQuantity}
                                </Badge>
                              </td>

                              <td>
                                {p.availableQuantity === 0 ? (
                                  <Badge color="danger">Out Of Stock</Badge>
                                ) : (
                                  <Badge color="warning">Low Stock</Badge>
                                )}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col>

            {/* RIGHT SIDE */}

            <Col lg={4}>
              {/* WAREHOUSE OCCUPANCY */}

              <Card className="alert-card mb-4">
                <div className="alert-card-header">
                  <FaWarehouse className="me-2" />
                  Warehouse Occupancy
                </div>

                <CardBody>
                  {/*
      Total Warehouse Capacity = 3000 Units
    */}

                  {(() => {
                    const warehouseCapacity = 3000;

                    const occupancyPercentage = (
                      (totalStock / warehouseCapacity) *
                      100
                    ).toFixed(1);

                    const remainingSpace = warehouseCapacity - totalStock;

                    return (
                      <>
                        {/* CURRENT STOCK */}
                        <div className="mb-3">
                          <div className="d-flex justify-content-between mb-1">
                            <span>Used Capacity</span>

                            <span>
                              {totalStock} / {warehouseCapacity} Units
                            </span>
                          </div>

                          <Progress
                            value={occupancyPercentage}
                            color={
                              occupancyPercentage >= 90
                                ? "danger"
                                : occupancyPercentage >= 70
                                  ? "warning"
                                  : "success"
                            }
                          />
                        </div>

                        {/* STATS */}
                        <Row className="text-center mt-4">
                          <Col xs={4}>
                            <h5 className="fw-bold mb-1">
                              {occupancyPercentage}%
                            </h5>

                            <small className="text-muted">Occupied</small>
                          </Col>

                          <Col xs={4}>
                            <h5 className="fw-bold mb-1">{remainingSpace}</h5>

                            <small className="text-muted">Available</small>
                          </Col>

                          <Col xs={4}>
                            <h5 className="fw-bold mb-1">
                              {warehouseCapacity}
                            </h5>

                            <small className="text-muted">Capacity</small>
                          </Col>
                        </Row>
                      </>
                    );
                  })()}
                </CardBody>
              </Card>

              {/* CATEGORY PERFORMANCE */}

              <Card className="alert-card mb-4">
                <div className="alert-card-header">
                  <FaShoppingCart className="me-2" />
                  Category Performance
                </div>

                <CardBody>
                  <div className="alert-scroll">
                    {categoryStats.map(([category, qty]) => (
                      <div key={category} className="mb-4">
                        <div className="d-flex justify-content-between mb-2">
                          <span>{category}</span>

                          <span>{qty} Units</span>
                        </div>

                        <Progress
                          value={(qty / totalStock) * 100}
                          color="dark"
                        />
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>

              {/* INVENTORY HEALTH */}

              <Card className="alert-card mb-4">
                <div className="alert-card-header">
                  <FaChartLine className="me-2" />
                  Inventory Health
                </div>

                <CardBody>
                  <div className="mb-3">
                    <div className="d-flex justify-content-between">
                      <span>Healthy Stock</span>
                      <span>{healthyStock.length}</span>
                    </div>

                    <Progress
                      value={(healthyStock.length / totalProducts) * 100}
                      color="success"
                    />
                  </div>

                  <div className="mb-3">
                    <div className="d-flex justify-content-between">
                      <span>Low Stock</span>
                      <span>{lowStockProducts.length}</span>
                    </div>

                    <Progress
                      value={(lowStockProducts.length / totalProducts) * 100}
                      color="warning"
                    />
                  </div>

                  <div>
                    <div className="d-flex justify-content-between">
                      <span>Out Of Stock</span>
                      <span>{outOfStockProducts.length}</span>
                    </div>

                    <Progress
                      value={(outOfStockProducts.length / totalProducts) * 100}
                      color="danger"
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </Base>
  );
};

export default Dashboard;
