import { useEffect, useState, useRef, useCallback } from "react";
import {
  Routes,
  Route,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import "reactjs-popup/dist/index.css";
import Popup from "reactjs-popup";

import {
  ENDPOINT_SEARCH,
  ENDPOINT_DISCOVER,
  ENDPOINT,
  API_KEY,
} from "./constants";
import Header from "./components/Header";
import Movies from "./components/Movies";

import Starred from "./components/Starred";
import WatchLater from "./components/WatchLater";
import YouTubePlayer from "./components/YoutubePlayer";
import "./app.scss";
import useMoviesSearch from "./hooks/useMoviesSearch";

const App = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [url, setUrl] = useState(ENDPOINT_DISCOVER);
  const [query, setQuery] = useState("");
  const { loading, error, movies, hasMoreMovies } = useMoviesSearch(
    query,
    pageNumber,
    url
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");
  const [videoKey, setVideoKey] = useState();
  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate();

  const closeModal = () => setOpen(false);



  const observer = useRef();
  const lastMovieElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMoreMovies) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMoreMovies]
  );

  const getSearchResults = (query) => {
    if (query !== "") {
      setQuery(query);
      setUrl(`${ENDPOINT_SEARCH}&query=${query}`);
    } else {

      setUrl(`${ENDPOINT_DISCOVER}&query=${searchQuery}`);
      setQuery(query)
      setSearchParams({});
    }
  };

  const searchMovies = (movieQuery) => {
    navigate("/");
    getSearchResults(movieQuery);
    setQuery(movieQuery)
  };

  const getMovies = () => {
    setPageNumber(1);
    if (searchQuery) {
      setQuery(searchQuery);
      setUrl(`${ENDPOINT_SEARCH}&query=${searchQuery}`);
    } else {
      setUrl(`${ENDPOINT_DISCOVER}`);
    }
  };

  const viewTrailer = (movie) => {
    getMovie(movie.id);
    if (!videoKey) setOpen(true);
    setOpen(true);
  };

  const getMovie = async (id) => {
    const URL = `${ENDPOINT}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`;

    setVideoKey(null);
    const videoData = await fetch(URL).then((response) => response.json());

    if (videoData.videos && videoData.videos.results.length) {
      const trailer = videoData.videos.results.find(
        (vid) => vid.type === "Trailer"
      );
      setVideoKey(trailer ? trailer.key : videoData.videos.results[0].key);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="App"  data-testid={`app`}>
      <Header
        searchMovies={searchMovies}
        searchParams={query}
        setSearchParams={setQuery}
      />

      <div className="container">
        {videoKey ? (
          <div className="">
            <Popup open={isOpen} closeOnDocumentClick onClose={closeModal}>
              <YouTubePlayer videoKey={videoKey} />
            </Popup>
          </div>
        ) : (
          <Popup open={isOpen} closeOnDocumentClick onClose={closeModal}>
            <div>
              <h6>no trailer available. Try another movie</h6>
            </div>
          </Popup>
        )}

        <Routes>
          <Route
            path="/"
            element={
              <>
                {" "}
                <Movies
                  lastMovieRef={lastMovieElementRef}
                  movies={movies}
                  viewTrailer={viewTrailer}
                />
                <div>{loading && "Loading..."}</div>
                <div>{error && "Error"}</div>
              </>
            }
          />
          <Route
            path="/starred"
            element={<Starred viewTrailer={viewTrailer} />}
          />
          <Route
            path="/watch-later"
            element={<WatchLater viewTrailer={viewTrailer} />}
          />
          <Route
            path="*"
            element={<h1 className="not-found">Page Not Found</h1>}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
