import {BrowserRouter,Routes,Route} from "react-router-dom"
import Login from './Login_pages/Login1'
import Movie from './MoviesSection/Movie1'
import TheatreList from './BookPre/TheatreList1'
import Selectpre from './BookPre/Selectpre1'
import Form from './AddShows/Form'
import AdminDashBoard from "./admin/adminpage"



function App() {
 

  return (
     
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/movie" element={<Movie />} />
      <Route path="/theatres/:id" element={<TheatreList/>}/>
      <Route path="/selectpreference/:type/:id" element={<Selectpre/>}/>
      <Route path="/addshow" element={<Form/>}/>
      <Route path='/admin' element={<AdminDashBoard />} />

    </Routes>
    </BrowserRouter>

  )
}

export default App
