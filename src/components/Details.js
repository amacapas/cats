import { useEffect } from "react";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useParams, useNavigate } from "react-router-dom";
import Notice from "./Notice";

import { usePageContext } from "../contexts/PageContext";
import { useCatContext } from "../contexts/CatContext";

const ListingContainer = styled.div`
  padding: 1em 0;
`;

const Details = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { catId } = params;

  const { loading, progress, networkError } = usePageContext();
  const { catDetails, setCatID } = useCatContext();

  useEffect(() => {
    setCatID(catId);
  }, [catId, setCatID]);

  return (
    <Container className="py-5">
      <ListingContainer>
        {loading ? (
          <ProgressBar now={progress} />
        ) : (
          [
            networkError ? (
              <Notice />
            ) : (
              <Card>
                <Card.Img variant="top" src={catDetails.url} />
                {Object.keys(catDetails).length && (
                  <>
                    <Card.Body>
                      <h4>{catDetails.breeds[0].name}</h4>
                      <h5>Origin: {catDetails.breeds[0].origin}</h5>
                      <i>{catDetails.breeds[0].temperament}</i>
                      <Card.Text>{catDetails.breeds[0].description}</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <Button variant="primary" onClick={() => navigate("/")}>
                        Back
                      </Button>
                    </Card.Footer>
                  </>
                )}
              </Card>
            ),
          ]
        )}
      </ListingContainer>
    </Container>
  );
};

export default Details;
