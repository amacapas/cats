import { createContext, useState, useContext } from "react";

const PageContext = createContext();

export const usePageContext = () => useContext(PageContext);

export const PageProvider = ({ children }) => {
  const pageStart = 0;
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(pageStart);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [networkError, setNetworkError] = useState(false);

  const loadMore = () => {
    setPage((page) => page + 1);
  };

  return (
    <PageContext.Provider
      value={{
        hasMore,
        setHasMore,
        pageStart,
        page,
        setPage,
        loadMore,
        loading,
        setLoading,
        progress,
        setProgress,
        networkError,
        setNetworkError,
      }}
    >
      {children}
    </PageContext.Provider>
  );
};
