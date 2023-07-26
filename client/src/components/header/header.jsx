/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import Store from "../../store/store";

import { useNavigate } from "react-router-dom";

function Navbar(props) {
  const store = new Store();

  const navigate = useNavigate();
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const users = await store.GetUserById();
      setData(users.data);
      try {
        const check = await store.checkAuth();
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
    if (localStorage.getItem("token")) {
    } else {
      navigate("/login");
    }
  }, []);
  return (
    <nav className="navbar navbar-expand navbar-light navbar-bg">
      <a className="sidebar-toggle js-sidebar-toggle">
        <i className="hamburger align-self-center"></i>
      </a>

      <div className="navbar-collapse collapse">
        <ul className="navbar-nav navbar-align">
          <li className="nav-item dropdown">
            <a
              className="nav-icon dropdown-toggle d-inline-block d-sm-none"
              href="#"
              data-bs-toggle="dropdown"
            >
              <i className="align-middle" data-feather="settings"></i>
            </a>

            <a
              className="nav-link dropdown-toggle d-none d-sm-inline-block"
              href="#"
              data-bs-toggle="dropdown"
            >
              <img
                src={props.logo}
                className="avatar img-fluid rounded me-1"
                alt="Charles Hall"
              />
              <span className="text-dark">{localStorage.getItem("name")}</span>
            </a>
            <div className="dropdown-menu dropdown-menu-end">
              <a
                className="dropdown-item"
                onClick={() => navigate("/AdminProfile")}
                href="#"
              >
                <i className="align-middle me-1" data-feather="user"></i>
                Профиль
              </a>
              {data.status === "Admin" ? (
                <a className="dropdown-item" href="/ChatAdmin">
                  <i className="align-middle me-1" data-feather="settings"></i>
                  ЧатАдмин
                </a>
              ) : (
                <a className="dropdown-item" href="/Chat">
                  <i className="align-middle me-1" data-feather="settings"></i>
                  Чат
                </a>
              )}

              <div className="dropdown-divider"></div>
              <a
                className="dropdown-item"
                onClick={() => store.logout()}
                href="/login"
              >
                Выйти
              </a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
