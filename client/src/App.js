import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminAddFilm from "./pages/Admin/AdminAddFilm/AdminAddFilm";
import AdminAddHall from "./pages/Admin/AdminAddHall/AdminAddHall";
import AdminAddSession from "./pages/Admin/AdminAddSession/AdminAddSession";
import AdminAllFilm from "./pages/Admin/AdminAllFilm/AdminAllFilm";
import AdminAllUsers from "./pages/Admin/AdminAllUsers/AdminAllUsers";
import AdminFavourite from "./pages/Admin/AdminFavourite/AdminFavourite";
import AdminGenre from "./pages/Admin/AdminGenre/AdminGenre";
import AdminHome from "./pages/Admin/AdminHome/AdminHome";
import AdminProfile from "./pages/Admin/AdminProfile/AdminProfile";
import Chat from "./pages/Admin/Chat/Chat";
import ChatAdmin from "./pages/Admin/ChatAdmin/ChatAdmin";
import Film from "./pages/Admin/Film/Film";
import GenreFilm from "./pages/Admin/GenreFilm/GenreFilm";
import History from "./pages/Admin/History/History";
import Login from "./pages/login/Login";
import Registration from"./pages/registration/Registration";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<Registration />}></Route>
        <Route path="/AdminHome" element={<AdminHome />}></Route>
        <Route path="/AdminAddFilm" element={<AdminAddFilm />}></Route>
        <Route path="/AdminAddHall" element={<AdminAddHall />}></Route>
        <Route path="/AdminAddSession" element={<AdminAddSession />}></Route>
        <Route path="/AdminAllFilm" element={<AdminAllFilm />}></Route>
        <Route path="/AdminAllUsers" element={<AdminAllUsers />}></Route>
        <Route path="/AdminFavourite" element={<AdminFavourite />}></Route>
        <Route path="/AdminGenre" element={<AdminGenre />}></Route>
        <Route path="/History" element={<History />}></Route>
        <Route path="/AdminProfile" element={<AdminProfile />}></Route>
        <Route path="/FilmGenre" element={<GenreFilm />}></Route>
        <Route path="/Film" element={<Film />}></Route>
        <Route path="/Chat" element={<Chat />}></Route>
        <Route path="/ChatAdmin" element={<ChatAdmin />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
