/* eslint-disable default-case */
/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Sidebar from "../../../components/sidebar/sidebar";
import Navbar from "../../../components/header/header";
import React, { useRef, useState } from "react";
import Store from "../../../store/store";
import logo from "../../../images/user.png";
const AdminAddHall = () => {
  const store = new Store();
  const nameRef = useRef(null);
  const coastvipRef = useRef(null);
  const coastnormRef = useRef(null);
  const seatsRef = useRef(null);
  const rowsRef = useRef(null);
  const messageRef = useRef(null);
  const [credentials, setCredentials] = useState({
    name: undefined,
    coastvip: undefined,
    coastnorm: undefined,
    seats: undefined,
    rows: undefined,
  });
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      nameRef.current.classList.remove("error");
      coastvipRef.current.classList.remove("error");
      coastnormRef.current.classList.remove("error");
      seatsRef.current.classList.remove("error");
      rowsRef.current.classList.remove("error");
      messageRef.current.classList.remove("alert-success");
      messageRef.current.classList.remove("alert-danger");

      const res = await store.AddHall(credentials);
      messageRef.current.classList.add("alert-success");
      messageRef.current.innerText = "Зал добавлен";
    } catch (error) {
      messageRef.current.classList.add("alert-danger");
      messageRef.current.innerText = error.response.data.message;
      for (let err of error.response.data.errors) {
        switch (err.param || err) {
          case "name":
            nameRef.current.classList.add("error");
            break;
          case "coastvip":
            coastvipRef.current.classList.add("error");
            break;
          case "coastnorm":
            coastnormRef.current.classList.add("error");
            break;
          case "seats":
            seatsRef.current.classList.add("error");
            break;
          case "rows":
            rowsRef.current.classList.add("error");
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
              <strong>Добавить зал</strong>
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
                                <label class="col-sm-4" for="name">
                                  <p>Название зала</p>
                                  <input
                                    ref={nameRef}
                                    class="form-control"
                                    id="name"
                                    type="text"
                                    onChange={handleChange}
                                  />
                                  <p class="msg_name text-danger"></p>
                                </label>
                                <label class="col-sm-4" for="rows">
                                  <p>Количество рядов</p>
                                  <input
                                    ref={rowsRef}
                                    class="form-control"
                                    id="rows"
                                    type="number"
                                    onChange={handleChange}
                                  />
                                  <p class="msg_row text-danger"></p>
                                </label>
                                <label class="col-sm-4" for="seats">
                                  <p>Количество мест в ряду</p>
                                  <input
                                    ref={seatsRef}
                                    class="form-control"
                                    id="seats"
                                    type="number"
                                    onChange={handleChange}
                                  />
                                  <p class="msg_seats text-danger"></p>
                                </label>
                              </div>
                              <div class="row">
                                <label class="col-sm-4" for="name">
                                  <p>Стоимость обычных билетов</p>
                                  <input
                                    ref={coastnormRef}
                                    class="form-control"
                                    id="coastnorm"
                                    type="text"
                                    onChange={handleChange}
                                  />
                                  <p class="msg_coastnorm text-danger"></p>
                                </label>
                                <label class="col-sm-4" for="rows">
                                  <p>Стоимость вип билетов</p>
                                  <input
                                    ref={coastvipRef}
                                    class="form-control"
                                    id="coastvip"
                                    type="number"
                                    onChange={handleChange}
                                  />
                                  <p class="msg_coastvip text-danger"></p>
                                </label>
                              </div>
                              <div class="row">
                                <div class="col-sm-6">
                                  <p class="msg_data_of_end text-danger"></p>
                                </div>
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

export default AdminAddHall;
