import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Login from './Login_pages/Login'
import Movie from './MoviesSection/Movie'
import TheatreList from './BookPre/TheatreList'
import Selectpre from './BookPre/Selectpre'
import Form from './AddShows/Form'


function App() {
 

  return (
     
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/movie" element={<Movie />} />
      <Route path="/theatres/:id" element={<TheatreList/>}/>
      <Route path="/selectpreference/:id" element={<Selectpre/>}/>
      <Route path="/addshow" element={<Form/>}/>
     


    

    </Routes>
    </BrowserRouter>

  )
}

export default App
