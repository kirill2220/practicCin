/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Store from "../../store/store";
function Sidebar(props) {
  const store = new Store();
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await store.GetUserById();
        setData(users.data);
      } catch (error) {
        if (error.response.data.message === "Пользователь не авторизован") {
          store.logout();
          navigate("/login");
        } else {
          console.log(error.response.data);
        }
      }
    };
    fetchData();
  }, []);

  const pathWithoutHash = window.location.pathname.substring(1);

  useEffect(() => {
    if (pathWithoutHash !== "ChatAdmin") {
      if (document.getElementById("2222")) {
        localStorage.removeItem('trig')
        document.body.removeChild(document.getElementById("2222"));
      }
    }
    setTimeout(() => {
      if (pathWithoutHash === "AdminHome") {
        const change = document.querySelector(".nav-kino");
        console.log(change);
        if (change) {
          change.classList.add("active");
        }
      }

      if (pathWithoutHash === "AdminFavourite") {
        const change = document.querySelector(".nav-favorite");
        if (change) {
          change.classList.add("active");
        }
      }

      if (pathWithoutHash === "AdminGenre") {
        const change = document.querySelector(".nav-genre");
        if (change) {
          change.classList.add("active");
        }
      }
      if (pathWithoutHash === "History") {
        const change = document.querySelector(".nav-history");
        if (change) {
          change.classList.add("active");
        }
      }

      if (pathWithoutHash === "AdminAllFilm") {
        const change = document.querySelector(".nav-allFilm");
        if (change) {
          change.classList.add("active");
        }
      }

      if (pathWithoutHash === "AdminAddSession") {
        const change = document.querySelector(".nav-addSession");
        if (change) {
          change.classList.add("active");
        }
      }
      if (pathWithoutHash === "AdminAddHall") {
        const change = document.querySelector(".nav-addHall");
        if (change) {
          change.classList.add("active");
        }
      }

      if (pathWithoutHash === "AdminAddFilm") {
        const change = document.querySelector(".nav-addFilm");
        if (change) {
          change.classList.add("active");
        }
      }

      if (pathWithoutHash === "AdminAllUsers") {
        const change = document.querySelector(".nav-allUsers");
        console.log(change);
        if (change) {
          change.classList.add("active");
        }
      }
    }, 100);
  }, []);
  return (
    <nav id="sidebar" className="sidebar js-sidebar">
      {data.status === "Admin" ? (
        <div className="sidebar-content js-simplebar">
          <a
            className="sidebar-brand"
            onClick={() => navigate("/AdminHome")}
            href="#"
          >
            <img src={props.logo} alt="dreamcinema" width="32" />
            <span className="align-middle">dreamcinema</span>
          </a>

          <ul className="sidebar-nav">
            <li className="sidebar-header ">Управление</li>

            <li className="sidebar-item nav-kino">
              <a
                className="sidebar-link"
                onClick={() => navigate("/AdminHome")}
                href="#"
              >
                <i className="bx bxs-videos align-middle "></i>{" "}
                <span className="align-middle">Кинотека</span>
              </a>
            </li>

            <li className="sidebar-item nav-favorite">
              <a
                className="sidebar-link"
                onClick={() => navigate("/AdminFavourite")}
                href="#"
              >
                <i className="bi bi-heart-fill align-middle nav-favorite"></i>{" "}
                <span className="align-middle">Любимые</span>
              </a>
            </li>

            <li className="sidebar-item nav-allUsers">
              <a
                className="sidebar-link"
                onClick={() => navigate("/AdminAllUsers")}
                href="#"
              >
                <i className="bx bxs-user-account "></i>{" "}
                <span className="align-middle">Пользователи</span>
              </a>
            </li>

            <li className="sidebar-item nav-genre">
              <a
                className="sidebar-link"
                onClick={() => navigate("/AdminGenre")}
                href="#"
              >
                <i className="align-middle " data-feather="list"></i>{" "}
                <span className="align-middle">Жанры</span>
              </a>
            </li>

            <li className="sidebar-item nav-addFilm">
              <a
                className="sidebar-link"
                onClick={() => navigate("/AdminAddFilm")}
                href="#"
              >
                <i className="align-middle " data-feather="film"></i>
                <span className="align-middle">Добавить фильм</span>
              </a>
            </li>
            <li className="sidebar-item nav-addHall">
              <a
                className="sidebar-link"
                onClick={() => navigate("/AdminAddHall")}
                href="#"
              >
                <i className="bx bx-table align-middle "></i>
                <span className="align-middle">Добавить зал</span>
              </a>
            </li>

            <li className="sidebar-item nav-addSession">
              <a
                className="sidebar-link"
                onClick={() => navigate("/AdminAddSession")}
                href="#"
              >
                <i className="bi bi-collection-play-fill align-middle "></i>
                <span className="align-middle">Добавить сеанс</span>
              </a>
            </li>
            <li className="sidebar-item nav-allFilm">
              <a
                className="sidebar-link"
                onClick={() => navigate("/AdminAllFilm")}
                href="#"
              >
                <i className="bi bi-collection-play-fill align-middle "></i>
                <span className="align-middle">Все фильмы</span>
              </a>
            </li>

            <li className="sidebar-item nav-history">
              <a
                className="sidebar-link"
                onClick={() => navigate("/History")}
                href="#"
              >
                <i className="bi bi-collection-play-fill align-middle "></i>
                <span className="align-middle">История действий</span>
              </a>
            </li>
            <li className="sidebar-item">
              <a
                className="sidebar-link"
                onClick={() => store.logout()}
                href="/login"
              >
                <i className="bx bxs-log-out align-middle"></i>{" "}
                <span className="align-middle">Выйти</span>
              </a>
            </li>
          </ul>
        </div>
      ) : (
        <div className="sidebar-content js-simplebar">
          <a
            className="sidebar-brand"
            onClick={() => navigate("/AdminHome")}
            href="#"
          >
            <img src={props.logo} alt="dreamcinema" width="32" />
            <span className="align-middle">dreamcinema</span>
          </a>

          <ul className="sidebar-nav">
            <li className="sidebar-header">Управление</li>

            <li className="sidebar-item nav-kino">
              <a
                className="sidebar-link"
                onClick={() => navigate("/AdminHome")}
                href="#"
              >
                <i className="bx bxs-videos align-middle"></i>{" "}
                <span className="align-middle">Кинотека</span>
              </a>
            </li>

            <li className="sidebar-item nav-favorite">
              <a
                className="sidebar-link"
                onClick={() => navigate("/AdminFavourite")}
                href="#"
              >
                <i className="bi bi-heart-fill align-middle"></i>{" "}
                <span className="align-middle">Любимые</span>
              </a>
            </li>

            <li className="sidebar-item nav-genre">
              <a
                className="sidebar-link"
                onClick={() => navigate("/AdminGenre")}
                href="#"
              >
                <i className="align-middle" data-feather="list"></i>{" "}
                <span className="align-middle">Жанры</span>
              </a>
            </li>

            <li className="sidebar-item">
              <a
                className="sidebar-link"
                onClick={() => store.logout()}
                href="/login"
              >
                <i className="bx bxs-log-out align-middle"></i>{" "}
                <span className="align-middle">Выйти</span>
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Sidebar;
