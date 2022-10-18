import { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../logo.svg";

const Header = (props) => {
  const [catBreed, setCatBreed] = useState("Select Breed");
  const { breeds, handleClick } = props;

  const onClick = (e) => {
    setCatBreed(e.name);
    handleClick(e.id);
  };

  return (
    <header>
      <Navbar variant="light" bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="/">
            <img
              alt="Cat Browser"
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            Cat Browser
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar" />
          <Navbar.Collapse id="navbar">
            <Nav>
              <NavDropdown
                id="nav-dropdown"
                title={catBreed}
                menuVariant="light"
              >
                {breeds.map((cat, i) => (
                  <NavDropdown.Item key={i} onClick={() => onClick(cat)}>
                    {cat.name}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
