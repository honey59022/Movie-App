import React, { Component } from 'react'
import { movies } from './getMovies'

export default class Favourite extends Component {
    constructor(){
        super();
        this.state={
            genres:[],
            currgen:"All Genres",
            movies:[],
            currText:"",
            limit:5,
            currPage:1,
        }
    }

    componentDidMount(){
        const genreids={28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};
        let data=JSON.parse(localStorage.getItem("movies-app") || "[]");

        
        let temp=[];

        data.forEach((movieObj)=>{
            if(!temp.includes(genreids[movieObj.genre_ids[0]])){
                temp.push(genreids[movieObj.genre_ids[0]])
            }
        })
        temp.unshift("All Genres");
        this.setState({
            genres:[...temp],
            movies:[...data],
        })
    }

    handleGenreChange=(gener)=>{
        this.setState({currgen:gener});
    }

    sortPopularityAsc=()=>{
        const temp=this.state.movies;

        temp.sort(function(obj1,obj2){
            return obj1.popularity-obj2.popularity;
        });

        this.setState({movies:[...temp]});
    }

    sortPopularityDesc=()=>{
        const temp=this.state.movies;

        temp.sort(function(obj1,obj2){
            return obj2.popularity-obj1.popularity;
        });

        this.setState({movies:[...temp]});
    }

    sortRatingAsc=()=>{
        const temp=this.state.movies;

        temp.sort(function(obj1,obj2){
            return obj1.vote_average-obj2.vote_average;
        });

        this.setState({movies:[...temp]});
    }

    sortRatingDesc=()=>{
        const temp=this.state.movies;

        temp.sort(function(obj1,obj2){
            return obj2.vote_average-obj1.vote_average;
        });

        this.setState({movies:[...temp]});
    }

    handlePageChange=(page)=>{
        this.setState({currPage:page});
    }

    handleDelete=(id)=>{
        const newArr=this.state.movies.filter((movieObj)=>movieObj.id!=id);
        this.setState({movies:[...newArr]});

        localStorage.setItem("movies-app",JSON.stringify(newArr));
    }

    render() {
        const genreids={28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};
        
        let filterarr=[];

        if(this.state.currText==''){
            filterarr=this.state.movies
        }
        else{
            filterarr=this.state.movies.filter((movieObj)=>{
                const title=movieObj.original_title.toLowerCase();

                return title.includes(this.state.currText.toLocaleLowerCase()); 
            });
        }

        if(this.state.currgen!="All Genres"){
            filterarr=this.state.movies.filter((movieObj)=>{
                return (genreids[movieObj.genre_ids[0]]==this.state.currgen);
            });
        }

        const pages=Math.ceil(filterarr.length/this.state.limit);
        const pagesArr=[];

        console.log(pages);

        const si=(this.state.currPage-1)*this.state.limit;
        const ei=si+this.state.limit;

        filterarr=filterarr.slice(si,ei);
        

        for(let i=1;i<=pages;i++){
            pagesArr.push(i);
        }

        return (
            <>
            <div className='main'>
                <div className='row'>
                    <div className='col-lg-3 col-sm-12'>
                        <ul className="list-group favourites-genres">
                            {
                                this.state.genres.map((gener)=>(
                                    (this.state.currgen===gener)?
                                    <li className="list-group-item" style={{background:"#3f51b5",color:"white",fontWeight:"bold",cursor:"pointer"}}>{gener}</li>
                                    :
                                    <li className="list-group-item" style={{background:"white",color:"#3f51b5",cursor:"pointer"}} onClick={()=>this.handleGenreChange(gener)}>{gener}</li>
                                    
                                ))
                            }
                        </ul>
                    </div>
                    <div className='col-lg-9 favourites-table col-sm-12'>
                        <div className='row'>
                            <input type="text" className='input-group-text col' placeholder='Search' value={this.state.currText} onChange={(e)=>this.setState({currText:e.target.value})}/>
                            <input type="number" className='input-group-text col' placeholder='Rows Count' value={this.state.limit} onChange={(e)=>this.setState({limit:e.target.value})}/>
                        </div>
                        <div className='row'>
                            <table class="table">
                            <thead>
                                <tr>
                                <th scope="col">Title</th>
                                <th>Genre</th>
                                <th scope="col"><i class="fas fa-sort-up" style={{cursor:"pointer"}} onClick={this.sortPopularityDesc}/>Popularity<i class="fas fa-sort-down" style={{cursor:"pointer"}} onClick={this.sortPopularityAsc}></i></th>
                                <th scope="col"><i class="fas fa-sort-up" style={{cursor:"pointer"}} onClick={this.sortRatingDesc}></i>Rating<i class="fas fa-sort-down" style={{cursor:"pointer"}} onClick={this.sortRatingAsc}></i></th>
                                <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filterarr.map((movieObj)=>(
                                        <tr>    
                                            <td><img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} alt={movieObj.title} style={{width:"5rem"}} /> {movieObj.original_title}</td>
                                            <td>{genreids[movieObj.genre_ids[0]]}</td>
                                            <td>{movieObj.popularity}</td>
                                            <td>{movieObj.vote_average} </td>
                                            <td><button type="button" class="btn btn-danger" onClick={(e)=>this.handleDelete(movieObj.id)}>Delete</button></td>
                                        </tr>
                                    ))
                                }
                                
                            </tbody>
                            </table>
                        </div>
                        <nav aria-label="Page navigation example">
                            <ul className="pagination">
                                {
                                    pagesArr.map((page)=>(
                                        <li className='page-items' style={{cursor:"pointer"}}><a className='page-link' onClick={()=>this.handlePageChange(page)} >{page}</a></li>
                                    ))
                                }
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
            </>
        )
    }
}
