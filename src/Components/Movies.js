import React, { Component } from 'react';
import axios from 'axios';

export default class Movies extends Component {
    constructor(){
        super();

        this.state={
            hover:"",
            parr:[1],
            currPage:1,
            movies:[],
            favourites:[]
        }
    }
    async componentDidMount(){
        // side effects work
        console.log("Mounting Done");

        //Api Call
        const response=await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=a23ccb99992690ce512b70d35e626b35&language=en-US&page=${this.state.currPage}`);
        const data=response.data;
        this.setState({movies:[...data.results]});
    }

    changeMovies=async ()=>{
        //Api Call
        const response=await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=a23ccb99992690ce512b70d35e626b35&language=en-US&page=${this.state.currPage}`);
        const data=response.data;
        this.setState({movies:[...data.results]});
    }

    handleLeft=()=>{
        if(this.state.currPage>1){
            this.setState({currPage:this.state.currPage-1},this.changeMovies);
        }
    }

    handleRight=()=>{
        let tempArr=[];
        for(let i=1;i<=this.state.parr.length+1 && i<5;i++){
            tempArr.push(i);
        }
        
        this.setState({
            parr:[...tempArr],
            currPage:this.state.currPage+1
        },this.changeMovies);

    }

    handleClick=(pageNo)=>{
        if(pageNo!==this.state.currPage){
            this.setState({
                currPage:pageNo
            },this.changeMovies);
        }
    }

    handleFavrouites=(movieObj)=>{
        let oldData=JSON.parse(localStorage.getItem("movies-app") || "[]");

        if(this.state.favourites.includes(movieObj.id)){
            oldData=oldData.filter((movie)=>movie.id!=movieObj.id)

        }
        else{
            oldData.push(movieObj);
        }

        localStorage.setItem("movies-app",JSON.stringify(oldData));
        console.log(oldData);
        this.handleFavrouitesState()
    }
    handleFavrouitesState=()=>{
        let oldData=JSON.parse(localStorage.getItem("movies-app") || "[]");
        let temp=oldData.map((movieObj)=>movieObj.id);

        this.setState({favourites:[...temp]});
    }
    render() {
        console.log("Render");
        return (
            <>
                {/* Movies card */}
                {
                    this.state.movies.length === 0 ?
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        :
                        <div>
                            <h3 className='text-center'><strong>Trending</strong></h3>
                            <div className='movies-list'>
                                {
                                    this.state.movies.map((movieObj) => (
                                        <div className="card movies-card" onMouseEnter={()=>(this.setState({hover:movieObj.id}))}  onMouseLeave={()=>(this.setState({hover:""}))}>
                                            <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} alt={movieObj.title} className="card-img-top movies-img" />
                                            <h4 className="card-title movies-title">{movieObj.original_title}</h4>
                                            <div className='button-wrapper' style={{ display: "flex", widht: "100%", justifyContent: "center" }}>
                                                {
                                                    (this.state.hover===movieObj.id) && (<a className="btn btn-primary movies-button" onClick={()=>this.handleFavrouites(movieObj)}>{this.state.favourites.includes(movieObj.id)?"Remove from Favourites":"Add To Favourites"}</a>)
                                                }
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                }

                {/* Pagination -> */}
                <div style={{display:"flex",justifyContent:"center"}}>
                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            <li className="page-item"><a className="page-link" onClick={this.handleLeft}>Previous</a></li>
                            {  
                                this.state.parr.map((parrValue)=>(
                                    <li className="page-item"><a className="page-link" onClick={()=>this.handleClick(parrValue)}>{parrValue}</a></li>
                                ))
                            }
                            <li className="page-item"><a className="page-link" onClick={this.handleRight}>Next</a></li>
                        </ul>
                    </nav>
                </div>
            </>
        )
    }
}
