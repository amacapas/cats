import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const Listings = (props) => {
  const { cats } = props;
  console.log(props);
  return (
    <Row xs={1} md={5} className="g-4">
      {cats.map((cat, idx) => (
        <Col key={idx}>
          <Card>
            <Card.Img variant="top" src={cat.url} />
            <Card.Body>
              <Card.Title>{cat.id}</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default Listings;
