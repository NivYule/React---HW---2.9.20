import React, { useState, useEffect } from 'react';
import './App.css';

import ImageComponent, { IImageProps } from './components/image';
import CustomHeader from './components/header';

import MovieList from './components/movie-list';
import { IMovie } from './components/movie';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import { getAllByTestId } from '@testing-library/react';
import Filter from './components/filter';
import { StarColors } from "./components/rank"
import Configuration from './components/configuration';
import AddMovie from "./components/add-movie";
import ServerFilter from './components/server-filter';
// jsx element


const images: Array<any> = [
    { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQGnMVTv0j0SVGZtdxSAh2aulvySNcgLHoqwg&usqp=CAU", height: 200, width: 300 },
    { src: "https://media.wired.com/photos/5c6750d23e8add2cdb91724f/125:94/w_2393,h_1800,c_limit/shark-551025353.jpg", height: 300, width: 500 },
    { src: "", height: 200, width: 300 }
]

// create function element
function App() {
    const initialMovies: Array<any> = []
    const initialDeletedMovies: Array<any> = []

    const [movies, setMovies] = useState(initialMovies)
    const [deletedMovies, setDeletedMovies] = useState(initialDeletedMovies)
    const [visibilityAddMovieForm,setVisibilty]=useState("none");
    const [starsColor, setStarsColor] = useState(StarColors.secondary);
    // const [getter, setter] = useState(Initial State)

    async function getMoviesApi() {
        const moviesUrl = "http://www.omdbapi.com/?s=scream&apikey=4f7462e2&page=10"
        const { data } = await axios.get(moviesUrl);
        setMovies(data.Search)
    }

    useEffect(() => {
        //this code will run: cases:
        // on initial render
        // on any chnage in the array params
        getMoviesApi()
    }, [starsColor])

    function clearMovies() {
        setMovies([])
    }

    function revert() {
        const deletedMoviesCopy = [...deletedMovies];
        if (!deletedMoviesCopy.length) return;
        const getLastRevertMovie = deletedMoviesCopy[0];
        deletedMoviesCopy.splice(0, 1)
        setMovies([...movies, getLastRevertMovie])
        setDeletedMovies([...deletedMoviesCopy])
    }

    function addMovie(movie:IMovie) {
        setMovies([...movies, movie])
    }

    function deleteMovie(moovieId: string): void {
        const moviesCopy = [...movies]
        const [index, m] = getMoviesData()
        moviesCopy.splice(index, 1);
        setMovies(moviesCopy)
        setDeletedMovies([...deletedMovies, m])
        function getMoviesData(): Array<any> {
            const index = movies.findIndex(m => m.imdbID === moovieId);
            const movie = movies.find(m => m.imdbID === moovieId);
            return [index, movie]

        }
    }

    function showMovieForm(){
        setVisibilty("block")
    }

    function filterOperation(value: string) {
        if (!value) return setMovies(movies);
        const filteredMovies = movies.filter(movie => movie.Title.toLowerCase().includes(value))
        setMovies(filteredMovies)
    }

    async function setMoviesFromServer(value:string){
        const moviesUrl = `http://www.omdbapi.com/?s=${value}&apikey=4f7462e2&page=10`
        const { data } = await axios.get(moviesUrl);        
        setMovies(data.Search)
    }

    return <Container>
        <Configuration setColorInGlobalState={setStarsColor} color={starsColor} />
        {/* <div>
            configuration
            <input onChange={({ target }) => setStarsColor((target as any).value)} />
        </div> */}
        <CustomHeader style={{ color: "green" }} text={"Movies"} />
        <Row>
            <Col>
                <Filter filterOperation={filterOperation} clearFilter={getMoviesApi}/>
            </Col>
            <Col>
                <ServerFilter filterOperation={setMoviesFromServer}/>
            </Col>
        </Row>
        <br></br>
        <Row className="justify-content-md-center">
            <Button variant="danger" onClick={clearMovies} > Clear Movies</Button>
            <Button variant="info" onClick={showMovieForm} > Add movie</Button> 
            <Button onClick={revert} > Revert</Button>
        </Row>
        <AddMovie addMovie={addMovie} visible={visibilityAddMovieForm}/>
        <MovieList noDataMessage="No Data for you firend" movies={moviesAdapter(movies)} configuration={{ starsColor }} />
    </Container>

    function moviesAdapter(movies: Array<any>): Array<IMovie> {
        return movies.map((movie: any) => {
            const { Title, Year, rank, Poster, imdbID, Type } = movie;
            return { deleteMovie, baseAdditionalInfoUrl: "http://imdb.com/title", title: Title, year: Year, poster: Poster, type: Type, id: imdbID, rate: rank }
        })
    }

}

interface IProps {
    images: Array<IImageProps>
}
function ImageList(props: IProps): any {
    const { images } = props
    return <div>
        {images.map((imgProps: any) => (<ImageComponent {...imgProps} url={imgProps.src} />))}
    </div>

}


function Details() {
    return <span> Details component </span>
}

export default App;