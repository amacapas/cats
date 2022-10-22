import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";

import { useCatContext } from "../contexts/CatContext";

const thumb = {
  height: "10vw",
  objectFit: "cover",
};

const Listings = () => {
  const { cats } = useCatContext();

  return (
    cats.length > 0 && (
      <Row xs={1} md={5} className="g-4">
        {cats.map((cat, idx) => (
          <Col key={idx}>
            <Card>
              <Card.Img variant="top" src={cat.url} style={thumb} />
              <Card.Body></Card.Body>
              <Card.Footer className="text-center">
                <Link to={cat.id}>View Details</Link>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    )
  );
};

export default Listings;
