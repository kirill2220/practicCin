/* eslint-disable default-case */
/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Navbar from "../../../components/header/header";
import Sidebar from "../../../components/sidebar/sidebar";
import React, { useRef, useState, useEffect } from "react";
import Store from "../../../store/store";
    import logo from '../../../images/user.png'
const AdminAddSession = () => {
       const store = new Store();
       const timeRef = useRef(null);
       const filmRef = useRef(null);
       const holeRef = useRef(null);
       const dateRef = useRef(null);
      const [data, setData] = useState([]);
      const [dataHall, setDataHall] = useState([]);
      useEffect(() => {
        const fetchData = async () => {
          const res = await store.GetFilmHall();
          setData(res.data.films);
          setDataHall(res.data.halls);
        };
        fetchData();
      }, []);
   
    const messageRef = useRef(null);
    const [credentials, setCredentials] = useState({
      time: undefined,
      film: undefined,
      hole: undefined,
      date: undefined,
    });
    const handleChange = (e) => {
      setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };
    const handleClick = async (e) => {
      e.preventDefault();
      try {
        timeRef.current.classList.remove("error");
        filmRef.current.classList.remove("error");
        holeRef.current.classList.remove("error");
        dateRef.current.classList.remove("error");
        messageRef.current.classList.remove("alert-success");
        messageRef.current.classList.remove("alert-danger");
        const res = await store.AddSession(credentials);
        messageRef.current.classList.add("alert-success");
        messageRef.current.innerText = "Сеанс добавлен";
      } catch (error) {
        messageRef.current.classList.add("alert-danger");
   messageRef.current.innerText = error.response.data.message;
   for (let err of error.response.data.errors) {
   
     switch (err.param || err) {
       case "time":
         timeRef.current.classList.add("error");
         break;
       case "film":
         filmRef.current.classList.add("error");
         break;
       case "hole":
         holeRef.current.classList.add("error");
         break;
       case "date":
         dateRef.current.classList.add("error");
         break;
     }
   }
      }
    };
  return (
    <div class="wrapper">
      <Sidebar logo={logo} />

      <div class="main">
        <Navbar logo={logo} />
        <main class="content">
          <div class="container-fluid p-0">
            <h1 class="h3 mb-3">
              <strong>Добавить сеанс</strong>
            </h1>

            <div class="row">
              <div class="col-xl-12 col-xxl-12 d-flex">
                <div class="w-100">
                  <div class="row">
                    <div class="col-sm-12">
                      <div class="card">
                        <div class="card-body">
                          <div class="row">
                            <div class="col mt-0">
                              <h5 class="card-title">CinemaDream</h5>
                            </div>
                          </div>
                          <div class="mb-0">
                            <form class="addFilms form-group">
                              <div class="row">
                                <label class="col-sm-6" for="name">
                                  <p>Дата сеанса</p>
                                  <input
                                    ref={dateRef}
                                    class="form-control"
                                    id="date"
                                    type="date"
                                    onChange={handleChange}
                                  />
                                  <p class="msg_date text-danger"></p>
                                </label>
                                <label class="col-sm-6" for="year">
                                  <p>Время сеанса</p>
                                  <input
                                    ref={timeRef}
                                    class="form-control"
                                    id="time"
                                    type="time"
                                    onChange={handleChange}
                                  />
                                  <p class="msg_time text-danger"></p>
                                </label>
                              </div>
                              <div class="row">
                                <label class="col-sm-6" for="hole">
                                  <p>Зал</p>
                                  <select
                                    ref={holeRef}
                                    id="hole"
                                    class="form-select"
                                    size="5"
                                    aria-label="select"
                                    onChange={handleChange}
                                  >
                                    {dataHall.map((item) => (
                                      <option value={item.id}>
                                        {item.name}{" "}
                                        {item.count_rows * item.count_place}{" "}
                                        мест
                                      </option>
                                    ))}
                                  </select>
                                </label>
                                <label class="col-sm-6" for="date_of_end">
                                  <p>Фильм</p>
                                  <select
                                    ref={filmRef}
                                    id="film"
                                    class="form-select"
                                    size="5"
                                    aria-label="select"
                                    onChange={handleChange}
                                  >
                                    {data.map((item) => (
                                      <option value={item.id}>
                                        {item.name}
                                      </option>
                                    ))}
                                  </select>
                                </label>
                              </div>

                              <div class="row">
                                <button
                                  class="btn btn-outline-info btn-lg btn-block"
                                  type="submit"
                                  onClick={handleClick}
                                >
                                  Отправить
                                </button>
                                <div
                                  id="message"
                                  ref={messageRef}
                                  class="alert  msg-success  text-center"
                                  role="alert"
                                ></div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminAddSession;
