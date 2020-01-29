import React , { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const initialData = {
    title: '',
    director: '',
    metascore: 1,
    stars: [],
  }


const UpdateMovie = props => {
    const [movie,  setMovie ] = useState(initialData);
    
    const { id } = useParams();

    const handleChange = e => {
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(res => setMovie(res.data ))
            .catch(err => console.log(err.response));

    },[]);

    const handlePut = e => {
        e.preventDefault()
        axios
            .put(`http://localhost:5000/api/movies/${id}`, movie)
            .then(res => {
                props.history.push(`/movies/${id}`)
            })
            .catch(err => {
                console.log(err)
            })
    }
    

    return (
        <div>
            <form onSubmit={handlePut}>
                <label htmlFor='title'>Title:</label>
                <input onChange={handleChange} value={movie.title} name='title' type='text' placeholder='Title'/>
                <label htmlFor='director'>Director:</label>
                <input onChange={handleChange} value={movie.director} name='director' type='text'  placeholder='Director'/>
                <label htmlFor='metascore'>Metascore:</label>
                <input onChange={handleChange} value={movie.metascore} name='metascore' type='text'  placeholder='metascore'/>
                {/* <label htmlFor='stars'>Stars:</label>
                <input onChange={handleChange}  value={movie.stars} name='stars' type='text'  placeholder='Stars'/> */}
                <button>Submit Edit</button>
            </form>
        </div>
    )
}

export default UpdateMovie;