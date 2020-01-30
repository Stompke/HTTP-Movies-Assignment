import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialData = {
    title: '',
    director: '',
    metascore: null,
    stars: [],
  }

const AddMovie = (props) => {

    const [movie,  setMovie ] = useState(initialData);
    const [starToAdd, setStarToAdd] = useState('');

    const handleChange = e => {
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        })
    }

    const starFilterHandle = itemName => {

        setMovie({
            ...movie,
            stars: movie.stars.filter(item => item !== itemName )
        })
    }


    const starAddHandle = (e) => {
        e.preventDefault();

        setMovie({
            ...movie,
            stars: [...movie.stars,
            starToAdd]
        })
    }


    const starToAddHandle = e => {
        
        setStarToAdd(e.target.value)
    }

    // useEffect(() => {
    //     axios
    //         .get(`http://localhost:5000/api/movies/${id}`)
    //         .then(res => setMovie(res.data ))
    //         .catch(err => console.log(err.response));

    // },[]);

    const handlePut = e => {

        e.preventDefault()
        axios
            .post(`http://localhost:5000/api/movies`, movie)
            .then(res => {
                console.log(res)

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
                
                {movie.stars.map(item => <button onClick={() => starFilterHandle(item)} key={item}>{item}  x</button>)}
                    <input onChange={starToAddHandle} value={starToAdd} placeholder='add more stars' />
                    <button onClick={starAddHandle} >add</button>
                
                <br/>
                <br/><button>Submit Edit</button>
            </form>
        </div>
    )
}

export default AddMovie;