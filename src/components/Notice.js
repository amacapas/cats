import Alert from "react-bootstrap/Alert";

const Notice = () => (
  <Alert variant="danger">
    <Alert.Heading>Oh snap! The cats are missing!</Alert.Heading>
    <p>Apologies but we could not load new cats for you at this time! Miau!</p>
  </Alert>
);

export default Notice;
