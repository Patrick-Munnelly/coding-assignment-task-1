import Movie from './Movie'
import '../styles/movies.scss'

const Movies = ({ movies, viewTrailer ,lastMovieRef}) => {

    return (
        <div id="movies" className="movies-grid" data-testid="movies">
            {movies?.map((movie,index) => {
                return (
                    <Movie 
                    index={index}
                    lastMovieRef={lastMovieRef}
                        movie={movie} 
                        key={`movie-card-${index}-id${movie.id}`}
                        viewTrailer={viewTrailer}
                    />
                )
            })}
            <div data-testid='bottom-movies'>

            </div>
        </div>
    )
}

export default Movies
