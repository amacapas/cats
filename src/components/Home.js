import styled from "styled-components";
import Container from "react-bootstrap/Container";
import ProgressBar from "react-bootstrap/ProgressBar";
import Button from "react-bootstrap/Button";

import Notice from "./Notice";
import Header from "./Header";
import Listings from "./Listings";

import { usePageContext } from "../contexts/PageContext";

const ListingContainer = styled.div`
  padding: 1em 0;
`;

const BtnWrapper = styled.div`
  display: block;
  width: 100%;
`;

const Home = () => {
  const {
    hasMore,
    loading,
    progress,
    loadMore,
    networkError,
  } = usePageContext();

  return (
    <Container className="py-5">
      <Header />
      <ListingContainer>
        {loading ? (
          <ProgressBar now={progress} />
        ) : (
          [networkError ? <Notice /> : <Listings />]
        )}
      </ListingContainer>
      {!loading && hasMore && (
        <BtnWrapper>
          <Button onClick={loadMore}>Load More</Button>
        </BtnWrapper>
      )}
    </Container>
  );
};

export default Home;
