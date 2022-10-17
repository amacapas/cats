import { useEffect, useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Header from "./Header";

const Home = () => {
  const [breeds, setBreeds] = useState([]);

  const getBreeds = async () => {
    const { data } = await axios.get("/breeds");
    setBreeds(data);
  };

  useEffect(() => {
    getBreeds();
  }, []);

  return (
    <Container className="py-5">
      <Header breeds={breeds} />
    </Container>
  );
};

export default Home;
