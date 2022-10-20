import React, {
  useState,
  useContext,
  useRef,
  useEffect,
  useCallback,
} from "react";

const mainUrl = "https://api.unsplash.com/photos/";

const searchUrl = "https://api.unsplash.com/search/photos/";
const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const mounted = useRef(false);
  const [newImages, setNewImages] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalURL, setModalURL] = useState("");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchImages = useCallback(async () => {
    const urlPage = `&page=${page}`;
    const urlQuery = `&query=${query}`;

    let url = `${mainUrl}${clientID}${urlPage}`;

    if (query) {
      url = `${searchUrl}${clientID}${urlPage}${urlQuery}`;
    }

    setLoading(true);

    try {
      const response = await fetch(url);
      const data = await response.json();

      setPhotos((old) => {
        if (query && page === 1) {
          return data.results;
        }
        if (query) {
          return [...old, ...data.results];
        } else {
          return [...old, ...data];
        }
      });

      setLoading(false);
      setNewImages(false);
    } catch (error) {
      setNewImages(false);
      setLoading(false);
    }
  });

  useEffect(() => {
    fetchImages();
  }, [fetchImages, page]);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }

    if (newImages === true && loading === false) {
      setPage((oldPage) => oldPage + 1);
    }
  }, [loading, newImages]);

  useEffect(() => {
    const event = window.addEventListener("scroll", () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.scrollHeight - 2
      ) {
        setNewImages(true);
      }
    });

    return () => window.removeEventListener("scroll", event);
  }, []);

  return (
    <AppContext.Provider
      value={{
        loading,
        photos,
        query,
        setQuery,
        fetchImages,
        page,
        setPage,
        openModal,
        setOpenModal,
        modalURL,
        setModalURL,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
