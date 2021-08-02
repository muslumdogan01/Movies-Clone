import React, { useEffect, useState } from "react";
import axios from "axios";
import Movie from "./Components/Movie";
import "./App.css";

const FEATURED_API =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getMovies(FEATURED_API);
  }, []);

  const getMovies = (API) => {
    axios.get(API).then((res) => setMovies(res.data.results));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      getMovies(SEARCH_API + searchTerm);

      setSearchTerm("");
    }
  };

  // fetch(SEARCH_API + searchTerm)
  //   .then((res) => res.json())
  //   .then((data) => {
  //     setMovies(data.results);
  //   });

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <div className="App">
        <header>
          <form className="form" onSubmit={handleOnSubmit}>
            <input
              className="search"
              value={searchTerm}
              onChange={handleOnChange}
              type="text"
              placeholder="Search..."
            />
          </form>
        </header>
        <div className="container">
          {movies.length > 0 &&
            movies.map((movie) => <Movie key={movie.id} {...movie} />)}
        </div>
      </div>
    </>
  );
}

export default App;
