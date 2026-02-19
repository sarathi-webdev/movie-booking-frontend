import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Login from './Login_pages/Login1'
// import Movie from './MoviesSection/Movie'
import Movie1 from './MoviesSection/Movie1'
import TheatreList from './BookPre/TheatreList1'
import Selectpre from './BookPre/Selectpre1'
import Form from './AddShows/Form'
// import tokens from './styles/tokens.css';
// import overrides from './styles/overrides.css';
// import utilities from './styles/utilities.css';


function App() {
 

  return (
     
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/movie" element={<Movie1 />} />
      <Route path="/theatres/:id" element={<TheatreList/>}/>
      <Route path="/selectpreference/:type/:id" element={<Selectpre/>}/>
      <Route path="/addshow" element={<Form/>}/>
     


    

    </Routes>
    </BrowserRouter>

  )
}

export default App
