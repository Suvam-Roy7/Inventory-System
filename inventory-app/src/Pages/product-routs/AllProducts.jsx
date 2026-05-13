import React, { useEffect, useState } from "react";

import {
  Container,
  Table,
  Input,
  InputGroup,
  InputGroupText,
  Button,
} from "reactstrap";

import {
  FaTrash,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaSearch,
  FaEdit,
} from "react-icons/fa";

import Base from "../../Component/Base";

import { getAllProducts, deleteProduct } from "../../services/product-service";

import bgImage from "../../assets/Products.jpg";

import { toast } from "react-toastify";

const AllProducts = () => {
  // =========================================
  // STATES
  // =========================================

  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");

  const [sortField, setSortField] = useState("");

  const [sortDirection, setSortDirection] = useState("asc");

  // =========================================
  // LOAD PRODUCTS
  // =========================================

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    getAllProducts().then((data) => {
      setProducts(data);
    });
  };

  // =========================================
  // DELETE PRODUCT
  // =========================================

  const handleDelete = (productid, productname) => {
    deleteProduct(productid)
      .then(() => {
        setProducts(
          products.filter((product) => product.productid !== productid),
        );

        toast.success(`${productname} Deleted Successfully`);
      })
      .catch((error) => {
        // Ignore expired session errors
        if (error.response?.status === 401) {
          return;
        }

        console.log(error);

        toast.error("Something went wrong");
      });
  };

  // =========================================
  // SEARCH FILTER
  // =========================================

  const filteredProducts = products.filter((product) => {
    return (
      product.productid.toString().includes(search.toLowerCase()) ||
      product.productname.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase()) ||
      product.productprice.toString().includes(search.toLowerCase())
    );
  });

  // =========================================
  // SORTING
  // =========================================

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (!sortField) return 0;

    let valueA = a[sortField];
    let valueB = b[sortField];

    if (typeof valueA === "string") {
      valueA = valueA.toLowerCase();
      valueB = valueB.toLowerCase();
    }

    if (valueA < valueB) {
      return sortDirection === "asc" ? -1 : 1;
    }

    if (valueA > valueB) {
      return sortDirection === "asc" ? 1 : -1;
    }

    return 0;
  });

  // =========================================
  // HANDLE SORT
  // =========================================

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // =========================================
  // SORT ICON
  // =========================================

  const getSortIcon = (field) => {
    if (sortField !== field) return <FaSort />;

    return sortDirection === "asc" ? <FaSortUp /> : <FaSortDown />;
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
        <Container fluid className="mt-4">
          {/* ========================================= */}
          {/* PAGE TITLE */}
          {/* ========================================= */}

          <h1 className="text-center text-white mb-4">All Products</h1>

          {/* ========================================= */}
          {/* SEARCH BAR */}
          {/* ========================================= */}

          <div className="d-flex justify-content-end mb-3">
            <InputGroup style={{ width: "320px" }}>
              <InputGroupText
                style={{
                  backgroundColor: "#1f2937",
                  color: "white",
                  border: "1px solid #1f2937",
                }}
              >
                <FaSearch />
              </InputGroupText>

              <Input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </InputGroup>
          </div>

          {/* ========================================= */}
          {/* TABLE WRAPPER */}
          {/* ========================================= */}

          <div
            style={{
              backgroundColor: "white",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 4px 12px rgba(0,0,0,0.18)",
            }}
          >
            {/* ========================================= */}
            {/* HEADER TABLE */}
            {/* ========================================= */}

            <Table
              bordered
              className="mb-0"
              style={{
                tableLayout: "fixed",
                width: "calc(100% - 6px)",
                marginBottom: 0,
              }}
            >
              <thead
                style={{
                  background: "linear-gradient(90deg, #1e293b, #334155)",
                  color: "white",
                }}
              >
                <tr>
                  {/* ID */}

                  <th
                    style={{
                      width: "120px",
                      minWidth: "120px",
                      maxWidth: "120px",
                      cursor: "pointer",
                      verticalAlign: "middle",
                    }}
                    onClick={() => handleSort("productid")}
                  >
                    ID {getSortIcon("productid")}
                  </th>

                  {/* PRODUCT NAME */}

                  <th
                    style={{
                      width: "420px",
                      minWidth: "420px",
                      maxWidth: "420px",
                      cursor: "pointer",
                      verticalAlign: "middle",
                    }}
                    onClick={() => handleSort("productname")}
                  >
                    Product Name {getSortIcon("productname")}
                  </th>

                  {/* CATEGORY */}

                  <th
                    style={{
                      width: "380px",
                      minWidth: "380px",
                      maxWidth: "380px",
                      cursor: "pointer",
                      verticalAlign: "middle",
                    }}
                    onClick={() => handleSort("category")}
                  >
                    Category {getSortIcon("category")}
                  </th>

                  {/* PRICE */}

                  <th
                    style={{
                      width: "180px",
                      minWidth: "180px",
                      maxWidth: "180px",
                      cursor: "pointer",
                      verticalAlign: "middle",
                    }}
                    onClick={() => handleSort("productprice")}
                  >
                    Price {getSortIcon("productprice")}
                  </th>

                  {/* ACTION */}

                  <th
                    style={{
                      width: "180px",
                      minWidth: "180px",
                      maxWidth: "180px",
                      textAlign: "center",
                      verticalAlign: "middle",
                    }}
                  >
                    Action
                  </th>
                </tr>
              </thead>
            </Table>

            {/* ========================================= */}
            {/* SCROLLABLE BODY */}
            {/* ========================================= */}

            <div
              style={{
                maxHeight: "65vh",
                overflowY: "auto",
                overflowX: "auto",
                paddingRight: "6px",
              }}
            >
              <Table
                bordered
                hover
                className="mb-0"
                style={{
                  tableLayout: "fixed",
                  width: "1280px",
                  marginBottom: 0,
                }}
              >
                <tbody>
                  {sortedProducts.length > 0 ? (
                    sortedProducts.map((product) => (
                      <tr key={product.productid}>
                        {/* ID */}

                        <td
                          style={{
                            width: "120px",
                            minWidth: "120px",
                            maxWidth: "120px",
                            verticalAlign: "middle",
                          }}
                        >
                          {product.productid}
                        </td>

                        {/* PRODUCT NAME */}

                        <td
                          style={{
                            width: "420px",
                            minWidth: "420px",
                            maxWidth: "420px",
                            verticalAlign: "middle",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                          title={product.productname}
                        >
                          {product.productname}
                        </td>

                        {/* CATEGORY */}

                        <td
                          style={{
                            width: "380px",
                            minWidth: "380px",
                            maxWidth: "380px",
                            verticalAlign: "middle",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                          title={product.category.replaceAll("_", " ")}
                        >
                          {product.category.replaceAll("_", " ")}
                        </td>

                        {/* PRICE */}

                        <td
                          style={{
                            width: "180px",
                            minWidth: "180px",
                            maxWidth: "180px",
                            verticalAlign: "middle",
                          }}
                        >
                          ₹ {product.productprice}
                        </td>

                        {/* ACTION */}

                        <td
                          style={{
                            width: "180px",
                            minWidth: "180px",
                            maxWidth: "180px",
                            textAlign: "center",
                            verticalAlign: "middle",
                          }}
                        >
                          <div className="d-flex justify-content-center gap-2">
                            {/* EDIT BUTTON */}

                            <Button
                              color="primary"
                              size="sm"
                              href={`/product/updateproduct/${product.productid}`}
                            >
                              <FaEdit />
                            </Button>

                            {/* DELETE BUTTON */}

                            <Button
                              color="danger"
                              size="sm"
                              onClick={() =>
                                handleDelete(
                                  product.productid,
                                  product.productname,
                                )
                              }
                            >
                              <FaTrash />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center p-4">
                        No Products Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </div>
        </Container>
      </div>
    </Base>
  );
};

export default AllProducts;
