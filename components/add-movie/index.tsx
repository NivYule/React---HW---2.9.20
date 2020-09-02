import React, { useState } from "react"
import FormControl from "react-bootstrap/FormControl"
import InputGroup from "react-bootstrap/InputGroup"
import Button from "react-bootstrap/esm/Button"

 interface IProp{
     addMovie:Function
     visible:string
 }

export default function AddMovie(props:IProp){

    const EmptyString = ""

    const [movie,setMovie]=useState({Title:EmptyString,Year:EmptyString,imdbID:EmptyString,Type:EmptyString,Poster:EmptyString,rank:0})

    const {addMovie,visible} =props

    function getMovie(movie:{Title:string,Year:string,imdbID:string,Type:string,Poster:string,rank:number}){
        
        if(movie.Title === EmptyString|| movie.Year === EmptyString ||movie.imdbID === EmptyString || movie.Type === EmptyString ||movie.Poster ===EmptyString)
            return false
        addMovie(movie)

    }
    
    return <div style={{border:"solid black 2px",padding:"10px",borderRadius:"20px" ,display:visible}}>

        <h1>Add Movie</h1>
        
        <InputGroup className="mb-1">
        <FormControl
        placeholder="Enter Title"
        onChange={(e)=>{setMovie({...movie,Title:e.target.value})}}>
        </FormControl>
        </InputGroup>
        
        <InputGroup className="mb-1">
        <input 
         type="number"
         className="form-control"
         placeholder="Enter Year"
         onChange={(e)=>{setMovie({...movie ,Year:e.target.value})}}
        />
        </InputGroup>
        
        <InputGroup className="mb-1">
        <FormControl
        placeholder="Enter imdbID"
        onChange={(e)=>{setMovie({...movie,imdbID:e.target.value})}}
        />
        </InputGroup>
        
        <InputGroup className="mb-1">
        <FormControl
        placeholder="Enter Type"
        onChange={(e)=>{setMovie({...movie,Type:e.target.value})}}
        />
        </InputGroup>
        
        <InputGroup className="mb-1">
        <input type="url"
         className="form-control"
         placeholder="Enter Poster url"
         onChange={(e)=>{setMovie({...movie,Poster:e.target.value})}}
        />
        </InputGroup>

        <input 
        type="number"
        className="form-control" 
        onChange={(e)=>{setMovie({...movie,rank:Number(e.target.value)})}}
        placeholder="Enter rank"></input>        
               
        <Button className="mt-1" onClick={()=>getMovie(movie)}>addMovie</Button>
    </div>
}