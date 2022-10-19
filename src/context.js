import React, { useState, useContext, useReducer, useEffect } from "react";

const mainUrl = "https://api.unsplash.com/photos/";

const searchUrl = "https://api.unsplash.com/search/photos";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);

  const fetchImages = async () => {
    let url = `${mainUrl}?client_id=${process.env.REACT_APP_ACCESS_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
