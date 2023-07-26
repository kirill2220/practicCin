/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Store from "../../store/store";
function SidebarUser(props) {
  const store = new Store();
  const navigate = useNavigate();
  const pathWithoutHash = window.location.pathname.substring(1);
  useEffect(() => {
    if (pathWithoutHash === "AdminHome") {
      const change = document.querySelector(".nav-kino");
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
  }, [pathWithoutHash]);
  return (
    <nav id="sidebar" className="sidebar js-sidebar">
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
    </nav>
  );
}

export default SidebarUser;
