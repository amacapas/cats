import { useCatContext } from "../contexts/CatContext";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../logo.svg";

const Header = () => {
  const { breeds, catBreed, setCatBreed, selectCatBreed } = useCatContext();

  const onClick = (cat) => {
    setCatBreed(cat.name);
    selectCatBreed(cat.id);
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
                {breeds.map((cat, idx) => (
                  <NavDropdown.Item key={idx} onClick={() => onClick(cat)}>
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
