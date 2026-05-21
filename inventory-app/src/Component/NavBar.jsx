import React, { useEffect, useState } from "react";
import { FiLogOut } from "react-icons/fi";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";

import { NavLink as ReactLink, useNavigate } from "react-router-dom";
import { doLogOut, getCurrentUser, isLogIn } from "../auth/auth";
import { FaUserCircle } from "react-icons/fa";
import HamburgerBar from "./HamburgerBar";
import { FaBars } from "react-icons/fa";
import { Offcanvas, OffcanvasHeader, OffcanvasBody } from "reactstrap";

function NavBar() {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(undefined);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    setLogin(isLogIn());
    setUser(getCurrentUser());
  }, [login]);

  const logOut = () => {
    doLogOut(() => {
      setLogin(false);
      navigate("/signin");
    });
  };

  return (
    <div>
      <Navbar
        color="#111827"
        dark
        expand="md"
        className="px-1"
        style={{ minHeight: "75px" }}
      >
        {/* Hamburger Button */}
        {login && (
          <button
            className="btn text-white me-3"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <FaBars size={22} />
          </button>
        )}
        <NavbarBrand tag={ReactLink} to="/">
          StockBridge
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink tag={ReactLink} to="/about">
                About
              </NavLink>
            </NavItem>

            {!login && (
              <NavItem>
                <NavLink tag={ReactLink} to="/signin">
                  SingIn
                </NavLink>
              </NavItem>
            )}
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                More
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Contact Us</DropdownItem>
                <DropdownItem>Option 2</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <Nav navbar>
            {login && (
              <>
                <NavItem>
                  <NavLink
                    className="d-flex align-items-center gap-2"
                    tag={ReactLink}
                    to="/user/userprofile"
                  >
                    <FaUserCircle size={22} />
                    {user?.username}
                  </NavLink>
                </NavItem>
                <NavItem>
                  <span
                    className="nav-link d-flex align-items-center"
                    style={{ cursor: "pointer" }}
                    onClick={logOut}
                  >
                    <FiLogOut size={22} />
                  </span>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
      <HamburgerBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
    </div>
  );
}

export default NavBar;
