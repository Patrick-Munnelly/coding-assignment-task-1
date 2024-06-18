import { Link, NavLink } from "react-router-dom"
import { useSelector } from 'react-redux'

import '../styles/header.scss'

const Header = ({ searchMovies,searchParams,setSearchParams }) => {
  
  const { starredMovies } = useSelector((state) => state.starred)



  


  const getMovieQuery = (movieQuery) =>{

    if ((movieQuery && movieQuery!==null)) {
       searchMovies(movieQuery)
    }
  
  }
  return (
    <header>
      <Link to="/" data-testid="home" onClick={() => searchMovies('')}>
        <i className="bi bi-film" />
      </Link>

      <nav>
        <NavLink to="/starred" data-testid="nav-starred" className="nav-starred">
          {starredMovies.length > 0 ? (
            <>
            <i className="bi bi-star-fill bi-star-fill-white" />
            <sup className="star-number">{starredMovies.length}</sup>
            </>
          ) : (
            <i className="bi bi-star" />
          )}
        </NavLink>
        <NavLink to="/watch-later" className="nav-fav">
          watch later
        </NavLink>
      </nav>

      <div className="input-group rounded">
        <Link to="/" onClick={(e) => searchMovies('')} className="search-link" >
          <input type="search" data-testid="search-movies"
            value={searchParams}
            onChange={(e) => getMovieQuery(e.target.value)} 
            className="form-control rounded" 
            placeholder="Search movies..." 
            aria-label="Search movies" 
            aria-describedby="search-addon" 
            />
        </Link>            
      </div>      
    </header>
  )
}

export default Header
