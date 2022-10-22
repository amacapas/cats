import axios from "axios";
import {
  createContext,
  useState,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { usePageContext } from "./PageContext";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers.common["x-api-key"] = process.env.REACT_APP_API_KEY;

const CatContext = createContext();

export const useCatContext = () => useContext(CatContext);

export const CatProvider = ({ children }) => {
  const title = "Select Breed";
  const catCount = useRef(0);
  const resCount = useRef(0);

  const [catID, setCatID] = useState();
  const [catDetails, setCatDetails] = useState({});
  const [breedID, setBreedID] = useState();
  const [cats, setCats] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [catBreed, setCatBreed] = useState(title);

  const {
    pageStart,
    page,
    setPage,
    setProgress,
    setLoading,
    setNetworkError,
    setHasMore,
  } = usePageContext();

  // progress bar settings
  const options = useMemo(
    () => ({
      onDownloadProgress: (e) => {
        let completed = Math.round((e.loaded * 100) / e.total);
        setProgress(completed);

        // add delay to let the progress bar finish
        if (completed === 100) {
          setTimeout(() => {
            setLoading(false);
            setProgress(0);
          }, 1000);
        }
      },
    }),
    [setLoading, setProgress]
  );

  // dropdown: fetch breeds
  useEffect(() => {
    const getBreeds = async () => {
      setLoading(true);

      try {
        const { data } = await axios.get("/breeds", options);
        setBreeds(data);
      } catch (error) {
        setNetworkError(true);
        setLoading(false);
      }
    };

    getBreeds();
  }, [options, setLoading, setNetworkError]);

  // trigger Load More
  useEffect(() => {
    setHasMore(false);
    if (resCount.current >= 10) {
      setHasMore(catCount.current < resCount.current);
    }
  }, [cats, catCount, resCount, setHasMore]);

  // listings: fetch cats
  useEffect(() => {
    const getCats = async () => {
      setLoading(true);

      try {
        const { data } = await axios.get(
          `/images/search?page=${page}&limit=10&breed_id=${breedID}`,
          options
        );

        // remove duplicates
        setCats((cats) => {
          const catData = [
            ...new Map([...cats, ...data].map((v) => [v.id, v])).values(),
          ];

          // count difference between result and existing
          catCount.current = cats.length;
          resCount.current = catData.length;
          return catData;
        });
      } catch (error) {
        setNetworkError(true);
        setLoading(false);
      }
    };

    if (title !== catBreed) {
      getCats();
    }
  }, [
    catBreed,
    breedID,
    options,
    page,
    setLoading,
    setNetworkError,
    setHasMore,
  ]);

  // details: fetch cat data
  useEffect(() => {
    const getDetails = async () => {
      setLoading(true);

      try {
        const { data } = await axios.get(`/images/${catID}`, options);
        setCatDetails(data);
      } catch (error) {
        setNetworkError(true);
        setLoading(false);
      }
    };

    if (catID !== undefined) {
      getDetails();
    }
  }, [catID, setCatDetails, options, setLoading, setNetworkError]);

  // dropdown action
  const selectCatBreed = (breed) => {
    setBreedID(breed);
    setPage(pageStart);
    setCats([]);
  };

  return (
    <CatContext.Provider
      value={{
        breeds,
        cats,
        catBreed,
        catDetails,
        setCatID,
        setCatBreed,
        selectCatBreed,
      }}
    >
      {children}
    </CatContext.Provider>
  );
};
