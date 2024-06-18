import { useEffect, useState } from "react";
import { getMovieData } from "../api/getMovies";

export default function useMoviesSearch(query, pageNumber, url) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [movies, setMovies] = useState([]);
  const [hasMoreMovies, setHasMoreMovies] = useState(false);

  useEffect(() => {
    setMovies([]);
  }, [query, url]);


  useEffect(() => {
    setLoading(true);
    setError(false);

    getMovieData(`${url}&page=${pageNumber}`).then((res) => {
      pageNumber === 1
        ? setMovies([...res.results])
        : setMovies((prevMovies) => {
            return [...prevMovies, ...res.results];
          });

      setHasMoreMovies(res.total_pages > pageNumber);
      setLoading(false);
    });
  }, [query, pageNumber, url]);

  return { loading, error, movies, hasMoreMovies };
}
