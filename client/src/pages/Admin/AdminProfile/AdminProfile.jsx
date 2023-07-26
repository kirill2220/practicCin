/* eslint-disable default-case */
/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Sidebar from "../../../components/sidebar/sidebar";
import Navbar from "../../../components/header/header";
import { useRef, useState, useEffect } from "react";
import Store from "../../../store/store";
import logo from "../../../images/user.png";
const AdminProfile = () => {
  import("./AdminProfile.css")
    const store = new Store();


  const messageRef = useRef(null);
  const nameRef = useRef(null);
  const loginRef = useRef(null);
  const emailRef = useRef(null);
    const [credentials, setCredentials] = useState({
      name: undefined,
      login: undefined,
      email: undefined,
    });
  const [data, setData] = useState([]);

   useEffect(() => {
     const fetchData = async () => {
       const res = await store.GetTicketUser();
       const users = await store.GetUserById();
       setDataTicket(res.data);
       setData(users.data);
       
     };
     fetchData();
   }, []);

  const [dataTicket, setDataTicket] = useState([]);
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  async function DeleteTicket(idTicket) {
    const res = await store.DeleteTicket(idTicket);
    setDataTicket(res.data);
  }
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      nameRef.current.classList.remove("error");
      loginRef.current.classList.remove("error");
      emailRef.current.classList.remove("error");
      messageRef.current.classList.remove("alert-success");
      messageRef.current.classList.remove("alert-danger");
      const res = await store.ChangeUserInfo(credentials);
      setData(res.data);
      localStorage.setItem("name", res.data.name);
      messageRef.current.classList.add("alert-success");
      messageRef.current.innerText = "Данные изменены";
    } catch (error) {
      messageRef.current.classList.add("alert-danger");
      messageRef.current.innerText = error.response.data.message;
      for (let err of error.response.data.errors) {
        switch (err.param || err) {
          case "name":
            nameRef.current.classList.add("error");
            break;
          case "email":
            emailRef.current.classList.add("error");
            break;
          case "login":
            loginRef.current.classList.add("error");
            break;
        }
      }
    }
  };
  return (
    <>
      <div class="wrapper">
        <Sidebar logo={logo} />

        <div class="main">
          <Navbar logo={logo} />
          <main class="content">
            <div class="container-fluid p-0">
              <div class="mb-3">
                <h1 class="h3 mb-3">
                  <strong>Профиль {data?.name}</strong>
                </h1>
              </div>
              <div class="row">
                <div class="col-md-4 col-xl-3">
                  <div class="card mb-3">
                    <div class="card-header">
                      <h5 class="card-title mb-0">Данные профиля</h5>
                    </div>
                    <div class="card-body text-center">
                      <img
                        src={logo}
                        alt="Christina Mason"
                        class="img-fluid rounded-circle mb-2"
                        width="128"
                        height="128"
                      />

                      <h5 class="card-title mb-0">{data?.name}</h5>
                      <div class="text-muted mb-2">{data?.status}</div>
                    </div>
                    <div class="card-body">
                      <h5 class="h6 card-title">О Вас</h5>
                      <ul class="list-unstyled mb-0">
                        <li class="mb-1">
                          <i class="bx bxs-dizzy"></i> Имя акаунта
                        </li>
                        <li class="mb-1"> {data?.login}</li>
                        <li class="mb-1">
                          <i class="bx bxs-user"></i> Имя
                        </li>
                        <li class="mb-1"> {data?.name}</li>
                        <li class="mb-1">
                          <i class="bx bxs-envelope"></i> Email
                        </li>
                        <li class="mb-1"> {data?.email}</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div class="col-md-8 col-xl-9">
                  <div class="card">
                    <div class="card-header">
                      <h5 class="card-title mb-0">Изменение данных</h5>
                    </div>
                    <div class="card-body h-100">
                      <ul class="nav nav-tabs nav-tabs-bordered">
                        <li class="nav-item">
                          <button
                            class="nav-link active"
                            data-bs-toggle="tab"
                            data-bs-target="#profile-overview"
                          >
                            Изменить данные
                          </button>
                        </li>

                      
                      </ul>
                      <div class="tab-content pt-2">
                        <div
                          class="tab-pane fade show active profile-overview"
                          id="profile-overview"
                        >
                          <div class="row">
                            <div class="col-md-12 col-xl-12">
                              <div class="card">
                                <div class="card-body h-auto">
                                  <div class="d-flex align-items-start justify-content-center">
                                    <form class="addFilms form-group">
                                      <div class="row">
                                        <label class="col-sm-12" for="login">
                                          <p>Логин</p>
                                          <input
                                            ref={loginRef}
                                            class="form-control"
                                            id="login"
                                            type="text"
                                            onChange={handleChange}
                                          />
                                          <p class="msg_login text-danger"></p>
                                        </label>
                                        <label class="col-sm-12" for="name">
                                          <p>Имя</p>
                                          <input
                                            ref={nameRef}
                                            class="form-control"
                                            id="name"
                                            type="text"
                                            onChange={handleChange}
                                          />
                                          <p class="msg_name text-danger"></p>
                                        </label>
                                        <label class="col-sm-12" for="email">
                                          <p>Email</p>
                                          <input
                                            ref={emailRef}
                                            class="form-control"
                                            id="email"
                                            type="text"
                                            onChange={handleChange}
                                          />
                                          <p class="msg_email text-danger"></p>
                                        </label>
                                      </div>
                                      <div class="row">
                                        <div class="col-sm-9">
                                          <p class="msg_data_of_end text-danger"></p>
                                        </div>
                                      </div>

                                      <div class="row">
                                        <button
                                          class="btn btn-outline-info btn btn-block changdata"
                                          type="submit"
                                          onClick={handleClick}
                                        >
                                          Изменить
                                        </button>
                                        <div
                                          id="message"
                                          ref={messageRef}
                                          class="alert  msg-success   text-center"
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

                        {/* <div
                        class="tab-pane fade profile-edit pt-3"
                        id="profile-edit"
                      >
                        <div class="row">
                          <div class="col-md-12 col-xl-12">
                            <div class="card">
                              <div class="card-body h-auto">
                                <div class="d-flex align-items-start justify-content-center">
                                  <form class="addFilms form-group">
                                    <div class="row">
                                      <label class="col-sm-12" for="password">
                                        <p>Текущий пароль</p>
                                        <input
                                          class="form-control"
                                          id="password"
                                          type="text"
                                          onChange={handleChange}
                                        />
                                        <p class="msg_password text-danger"></p>
                                      </label>
                                      <label
                                        class="col-sm-12"
                                        for="newpassword"
                                      >
                                        <p>Новый пароль</p>
                                        <input
                                          class="form-control "
                                          id="newpassword"
                                          type="text"
                                          onChange={handleChange}
                                        />
                                        <p class="msg_newpassword text-danger"></p>
                                      </label>
                                      <label
                                        class="col-sm-12"
                                        for="renewpassword"
                                      >
                                        <p>Повторите пароль</p>
                                        <input
                                          class="form-control"
                                          id="renewpassword"
                                          type="text"
                                          onChange={handleChange}
                                        />
                                        <p class="msg_renewpassword text-danger"></p>
                                      </label>
                                    </div>

                                    <div class="row">
                                      <div class="col-sm-9">
                                        <p class="msg_data_of_end text-danger"></p>
                                      </div>
                                    </div>
                                    <div class="row">
                                      <button
                                        class="btn btn-outline-info btn btn-block changpassword"
                                        type="submit"
                                        onClick={handleClick}
                                      >
                                        Изменить
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
                      </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-12 col-xl-12">
                  <div class="card">
                    <div class="card-header">
                      <h5 class="card-title mb-0">Ваши заказы</h5>
                    </div>
                    <div class="card-body h-auto">
                      <div class="d-flex align-items-start justify-content-center">
                        <table
                          id="tableorder"
                          class="table table-striped table-hover"
                        >
                          <thead>
                            <tr>
                              <td>Название</td>
                              <td>Дата</td>
                              <td>Время</td>
                              <td>Зал</td>
                              <td>Номер места</td>
                              <td>Удалить</td>
                            </tr>
                          </thead>
                          <tbody id="orderbody">
                            {dataTicket?.map((item) => (
                              <tr>
                                <td>{item.session?.film.name}</td>
                                <td>
                                  {new Date(item.session?.datesession)
                                    .getDate()
                                    .toString()
                                    .padStart(2, "0")}
                                  .
                                  {(
                                    new Date(
                                      item.session?.datesession
                                    ).getMonth() + 1
                                  )
                                    .toString()
                                    .padStart(2, "0")}
                                  .
                                  {new Date(item.session?.datesession)
                                    .getFullYear()
                                    .toString()}
                                </td>
                                <td>
                                  {new Date(item.session?.timesession)
                                    .getUTCHours()
                                    .toString()
                                    .padStart(2, "0")}
                                  :
                                  {new Date(item.session?.timesession)
                                    .getMinutes()
                                    .toString()
                                    .padStart(2, "0")}
                                </td>
                                <td>{item.session?.hall.name}</td>
                                <td>{item.place?.place}</td>
                                <td>
                                  <button
                                    class="  btn btn-danger text-center "
                                    onClick={() => DeleteTicket(item.id)}
                                  >
                                    <i class="bi bi-x-square"></i>
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );

};

export default AdminProfile;
