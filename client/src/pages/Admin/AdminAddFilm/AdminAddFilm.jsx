/* eslint-disable default-case */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Sidebar from "../../../components/sidebar/sidebar";
import Navbar from "../../../components/header/header";
import logo from "../../../images/user.png";
import Store from "../../../store/store";
import { useState } from "react";
import React, { useRef } from "react";

const AdminAddFilm = () => {
  const store = new Store();
  const messageRef = useRef(null);
  const nameRef = useRef(null);
  const yearRef = useRef(null);
  const durationRef = useRef(null);
  const ageRef = useRef(null);
  const dateOfStartRef = useRef(null);
  const dateOfEndRef = useRef(null);
  const genreRef = useRef(null);
  const descriptionRef = useRef(null);
  const posterRef = useRef(null);

  const [credentials, setCredentials] = useState({
    name: undefined,
    year: undefined,
    duration: undefined,
    age: undefined,
    date_of_start: undefined,
    date_of_end: undefined,
    genre: undefined,
    description: undefined,
    poster: undefined,
  });
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setCredentials((prev) => ({ ...prev, poster: file }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      messageRef.current.classList.remove("error");
      nameRef.current.classList.remove("error");
      yearRef.current.classList.remove("error");
      durationRef.current.classList.remove("error");
      ageRef.current.classList.remove("error");
      dateOfStartRef.current.classList.remove("error");
      dateOfEndRef.current.classList.remove("error");
      genreRef.current.classList.remove("error");
      descriptionRef.current.classList.remove("error");
      posterRef.current.classList.remove("error");
      messageRef.current.classList.remove("alert-success");
      messageRef.current.classList.remove("alert-danger");
      const formData = new FormData();
      formData.append("image", credentials.poster);
      formData.append("name", credentials.name);
      formData.append("year", credentials.year);
      formData.append("duration", credentials.duration);
      formData.append("age", credentials.age);
      formData.append("date_of_start", credentials.date_of_start);
      formData.append("date_of_end", credentials.date_of_end);
      formData.append("genre", credentials.genre);
      formData.append("description", credentials.description);

      const res = await store.AddFilm(formData);

      messageRef.current.classList.add("alert-success");
      messageRef.current.innerText = "Фильм добавлен";
    } catch (error) {
      messageRef.current.classList.add("alert-danger");
      messageRef.current.innerText = error.response.data.message;
      for (let err of error.response.data.errors) {
        switch (err.param || err) {
          case "name":
            nameRef.current.classList.add("error");
            break;
          case "year":
            yearRef.current.classList.add("error");
            break;
          case "duration":
            durationRef.current.classList.add("error");
            break;
          case "age":
            ageRef.current.classList.add("error");
            break;
          case "date_of_start":
            dateOfStartRef.current.classList.add("error");
            break;
          case "date_of_end":
            dateOfEndRef.current.classList.add("error");
            break;
          case "genre":
            genreRef.current.classList.add("error");
            break;
          case "description":
            descriptionRef.current.classList.add("error");
            break;
          case "poster":
            posterRef.current.classList.add("error");
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
              <strong>Добавить фильм</strong>
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
                                <label class="col-sm-3" for="name">
                                  <p>Название фильма</p>
                                  <input
                                    ref={nameRef}
                                    class="form-control"
                                    id="name"
                                    type="text"
                                    onChange={handleChange}
                                  />
                                  <p class="msg_name text-danger"></p>
                                </label>
                                <label class="col-sm-3" for="year">
                                  <p>Год выпуска</p>
                                  <input
                                    ref={yearRef}
                                    class="form-control"
                                    id="year"
                                    type="number"
                                    onChange={handleChange}
                                  />
                                  <p class="msg_year text-danger"></p>
                                </label>
                                <label class="col-sm-3" for="duration">
                                  <p>Продолжительность</p>
                                  <input
                                    ref={durationRef}
                                    class="form-control"
                                    id="duration"
                                    type="time"
                                    onChange={handleChange}
                                  />
                                </label>
                                <label class="col-sm-3" for="age">
                                  <p>Возростное ограничение</p>
                                  <input
                                    ref={ageRef}
                                    class="form-control"
                                    id="age"
                                    type="number"
                                    onChange={handleChange}
                                  />
                                  <p class="msg_age text-danger"></p>
                                </label>
                              </div>
                              <div class="row">
                                <label class="col-sm-3" for="date_of_start">
                                  <p>Дата начала проката</p>
                                  <input
                                    ref={dateOfStartRef}
                                    class="form-control"
                                    id="date_of_start"
                                    type="date"
                                    onChange={handleChange}
                                  />
                                </label>
                                <label class="col-sm-3" for="date_of_end">
                                  <p>Дата окончания проката</p>
                                  <input
                                    ref={dateOfEndRef}
                                    class="form-control"
                                    id="date_of_end"
                                    type="date"
                                    onChange={handleChange}
                                  />
                                </label>
                                <label class="col-sm-3" for="genre">
                                  <p>Жанр</p>
                                  <input
                                    ref={genreRef}
                                    class="form-control"
                                    id="genre"
                                    type="text"
                                    onChange={handleChange}
                                  />
                                </label>
                                <div class="col-sm-3">
                                  <p>Постер фильма</p>
                                  <div class="input-group mb-3">
                                    <div ref={posterRef} class="custom-file">
                                      <label
                                        id="fileNameExt"
                                        class="custom-file-label"
                                        for="poster"
                                      >
                                        Choose file
                                      </label>
                                      <input
                                        type="file"
                                        name="poster"
                                        class="custom-file-input"
                                        accept="image/*,image/jpeg"
                                        onChange={handleImageChange}
                                        id="poster"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* <script>
                                                        function getFileNameWithExt(event) {

                                                            if (!event || !event.target || !event.target.files || event.target.files.length === 0) {
                                                                return;
                                                            }

                                                            const name = event.target.files[0].name;
                                                            const lastDot = name.lastIndexOf('.');

                                                            const fileName = name.substring(0, lastDot);
                                                            const ext = name.substring(lastDot + 1);

                                                            $('*#fileNameExt').text(`${fileName}.${ext}`);
                                                        }
                                                    </script> */}

                              <div class="row">
                                <div class="col-sm-6">
                                  <p class="msg_data_of_end text-danger"></p>
                                </div>
                              </div>

                              <div class="row">
                                <div class="row">
                                  <label class="col-sm-12" for="description">
                                    <p>Описание</p>
                                    <textarea
                                      ref={descriptionRef}
                                      rows="5"
                                      class="form-control"
                                      id="description"
                                      onChange={handleChange}
                                    ></textarea>
                                  </label>
                                </div>

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

export default AdminAddFilm;
