import React, { useState, useEffect } from 'react';
import './Home.css';
import dateFormat from 'dateformat';
import metacritic from '../../media/metacritic.png';

const Home = ({ data }) => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    console.log(data);
    // Extract genres from data
    const allGenres = new Set();
    data.forEach(day => {
      day.movies.forEach(movie => {
        movie.genre.forEach(genre => allGenres.add(genre));
      });
    });
    setGenres(['all', ...Array.from(allGenres)]);
  }, [data]);

  useEffect(() => {
    // Filter movies based on selected genre
    const filtered = data.flatMap(day =>
      day.movies
        .filter(movie =>
          (selectedGenre === 'all' || movie.genre.includes(selectedGenre)) &&
          movie.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map(movie => ({ ...movie, date: day.date })) // Add date to each movie
    );
      
      // Create an object to store movies by date
      const moviesByDate = {};
      
      // Iterate through the movies data
      filtered.forEach(movie => {
        // Extract the release date from the movie data
        const releaseDate = movie.date;
      
        // Check if the date already exists in the moviesByDate object
        if (!moviesByDate[releaseDate]) {
          // If the date doesn't exist, create an array for that date
          moviesByDate[releaseDate] = [];
        }
      
        // Add the movie to the array for the corresponding date
        moviesByDate[releaseDate].push(movie);
      });
      
      // Convert the moviesByDate object into an array of objects
      const resultArray = Object.entries(moviesByDate).map(([date, movies]) => ({
        date,
        movies
      }));
      
      console.log(typeof(resultArray));

      
    setFilteredMovies(resultArray);
  }, [selectedGenre, searchTerm, data]);

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <label htmlFor="genreFilter">Filter by Genre:</label>
      <select id="genreFilter" value={selectedGenre} onChange={handleGenreChange}>
        {genres.map(genre => (
          <option key={genre} value={genre}>{genre}</option>
        ))}
      </select>

      <br />

      <label htmlFor="titleSearch">Search by Title:</label>
      <input type="text" id="titleSearch" value={searchTerm} onChange={handleSearchChange} />

      <ul>
          {filteredMovies.map(movieList => {
            return <div>
              <div className="movie_schedule_date">{dateFormat(movieList.date, "dddd, mmmm dS, yyyy")}</div>
                {movieList.movies.map(movie => {
                  return <div className="movie_cards">
                    <img className="movie_cards__img" src={movie.poster} />
                      <div className="movie_cards__overlay">
                        <div className="movie_card__title">{movie.title}</div>
                          <div className="movie_card__genres">
                            {movie.genre.map(genre => {
                              return <span className="movie_card__genre">{genre}</span>
                            })}
                          </div>
                        	<div className="movie_card__runtime">
                            {movie.runtime}
                            <span className="movie_card__rating">{movie.imdb_rating}<i className="fas fa-star" /></span>
                          </div>
                          <div className="movie_card__year">
                            {movie.year}
                            {movie.meta_score!=="N/A"? <span className="movie_card_meta_rating">{movie.meta_score}<img className="metacritic_image" src={metacritic}/></span>
                              :""}
                          </div>
                          <div className="movie_card__description">{movie ? movie.plot.slice(0,118)+"..." : ""}</div>
                        </div>
                      </div>
                    })}
              </div>
            })}
          </ul>
    </div>
  );
};

export default Home;
