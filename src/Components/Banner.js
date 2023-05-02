import React, { Component } from 'react';
import { movies } from './getMovies';

export default class Banner extends Component {
    render() {
        const movie = movies.results[0];
        return (
            <>{
                movie === '' ?
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    :
                    <div>
                        <div className="ca rd banner-card">
                            <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.title}  className="card-img-top banner-img"  />
                            <h1 className="card-title banner-title">{movie.original_title}</h1>
                            <p className="card-text banner-text">{movie.overview}</p>
                        
                        </div>
                    </div>
            }
            </>
        )
    }
}
