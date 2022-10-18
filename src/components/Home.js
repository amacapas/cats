import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Container from "react-bootstrap/Container";
import ProgressBar from "react-bootstrap/ProgressBar";
import Button from "react-bootstrap/Button";
import Header from "./Header";
import Listings from "./Listings";

const ListingContainer = styled.div`
  padding: 1em 0;
`;

const BtnWrapper = styled.div`
  display: block;
  width: 100%;
`;

const Home = () => {
  const [page, setPage] = useState(1);
  const [cats, setCats] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const getProgress = {
    onDownloadProgress: (progressEvent) => {
      let percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      setProgress(percentCompleted);
      if (percentCompleted === 100) {
        setTimeout(() => {
          setLoading(false);
          setProgress(0);
        }, 1000);
      }
    },
  };

  const getBreeds = async () => {
    setLoading(true);
    const { data } = await axios.get("/breeds", getProgress);
    setBreeds(data);
  };

  const getCats = async (e) => {
    setLoading(true);
    const { data } = await axios.get(
      `/images/search?page=${page}&limit=10&breed_id=${e}`,
      getProgress
    );
    setCats(data);
  };

  useEffect(() => {
    getBreeds();
  }, []);

  const handleClick = (e) => {
    getCats(e);
  };

  return (
    <Container className="py-5">
      <Header breeds={breeds} handleClick={handleClick} />
      <ListingContainer>
        {loading ? <ProgressBar now={progress} /> : <Listings cats={cats} />}
      </ListingContainer>
      <BtnWrapper>
        <Button>Load More</Button>
      </BtnWrapper>
    </Container>
  );
};

export default Home;
