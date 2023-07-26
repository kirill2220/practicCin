/* eslint-disable default-case */
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import React, { useRef } from "react";
import "../../css/app.css";
import "../../css/global_style.css";
import "../../css/forms.css";
import logo from "../../images/user.png";
const Registration = () => {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
    name: undefined,
    login: undefined,
  });

  const messageRef = useRef(null);
  const inputPasswordRef = useRef(null);
  const inputLoginRef = useRef(null);
  const inputNameRef = useRef(null);
  const inputEmailRef = useRef(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      document.getElementById("errorEmail").innerHTML = "";
      document.getElementById("errorPassword").innerHTML = "";
      document.getElementById("errorName").innerHTML = "";
      document.getElementById("errorLogin").innerHTML = "";
      inputNameRef.current.classList.remove("error");
      inputPasswordRef.current.classList.remove("error");
      inputLoginRef.current.classList.remove("error");
      inputEmailRef.current.classList.remove("error");
      const res = await axios.post(
        "http://localhost:5000/api/registration",
        credentials
      );

      navigate("/login");
    } catch (err) {
      let error = err.response.data;
      switch (error.errors) {
        case "login":
          inputLoginRef.current.classList.add("error");
          document.getElementById("errorLogin").innerHTML = error.message;
          break;
        case "email":
          inputEmailRef.current.classList.add("error");
          document.getElementById("errorEmail").innerHTML = error.message;
          break;
      }
      for (let err of error.errors) {
        switch (err.param || err) {
          case "email":
            inputEmailRef.current.classList.add("error");
            document.getElementById("errorEmail").innerHTML = err.msg + ".";
            break;
          case "password":
            inputPasswordRef.current.classList.add("error");
            document.getElementById("errorPassword").innerHTML = err.msg + ".";
            break;
          case "login":
            inputLoginRef.current.classList.add("error");
            document.getElementById("errorLogin").innerHTML = err.msg + ".";
            break;
          case "name":
            inputNameRef.current.classList.add("error");
            document.getElementById("errorName").innerHTML = err.msg + ".";
            break;
        }
      }
      // if (error.errors) {
      //   if (error.errors.includes("password")) {
      //     inputPasswordRef.current.classList.add("error");
      //   }
      //   if (error.errors.includes("login")) {
      //     inputLoginRef.current.classList.add("error");
      //   }
      // }

      // messageRef.current.classList.remove("alert-none");
      // document.getElementById("errorMessage").innerHTML = err.response.data.message;

      console.log(err);
    }
  };

  return (
    <main class="d-flex w-100">
      <div class="container d-flex flex-column">
        <div class="row vh-100">
          <div class="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
            <div class="d-table-cell align-middle">
              <div class="text-center mt-4">
                <h1 class="h2">Добро пожаловать в dreamcinema</h1>
                <p class="lead">Зарегистрируйтесь для продолжения</p>
              </div>

              <div class="card">
                <div class="card-body">
                  <div class="m-sm-4">
                    <div class="text-center">
                      <img
                        src={logo}
                        alt="Charles Hall"
                        class="img-fluid rounded-circle"
                        width="132"
                        height="132"
                      />
                    </div>
                    <form>
                      <div class="mb-3">
                        <label for="login" class="form-label">
                          Логин
                        </label>
                        <input
                          ref={inputLoginRef}
                          id="login"
                          class="form-control form-control-lg"
                          type="text"
                          name="login"
                          title="Должно быть не менее 6 символов  "
                          placeholder="Введите ваш логин"
                          onChange={handleChange}
                          required
                        />
                        <p id="errorLogin" class="msg_login text-danger"></p>
                      </div>
                      <div class="mb-3">
                        <label for="name" class="form-label">
                          Имя
                        </label>
                        <input
                          ref={inputNameRef}
                          id="name"
                          class="form-control form-control-lg"
                          type="text"
                          name="name"
                          placeholder="Введите ваше имя"
                          onChange={handleChange}
                          required
                        />
                        <p id="errorName" class="msg_name text-danger"></p>
                      </div>
                      <div class="mb-3">
                        <label for="email" class="form-label">
                          Email
                        </label>
                        <input
                          ref={inputEmailRef}
                          id="email"
                          class="form-control form-control-lg"
                          type="email"
                          name="email"
                          pattern="[a-zA-Z0-9]+"
                          placeholder="Введите ваш email"
                          onChange={handleChange}
                          required
                        />
                        <p id="errorEmail" class="msg_email text-danger"></p>
                      </div>
                      <div class="mb-3">
                        <label for="password" class="form-label">
                          Пароль
                        </label>
                        <input
                          ref={inputPasswordRef}
                          class="form-control form-control-lg"
                          id="password"
                          type="password"
                          name="password"
                          placeholder="Введите ваш пароль"
                          onChange={handleChange}
                          required
                        />
                        <p
                          id="errorPassword"
                          class="msg_password text-danger"
                        ></p>
                      </div>

                      <div class="text-center mt-3">
                        <button
                          class="register-but btn btn-lg btn-primary"
                          type="submit"
                          name="register"
                          value="register"
                          id="submit"
                          onClick={handleClick}
                        >
                          Зарегистрироваться
                        </button>
                      </div>
                      <div
                        id="errorMessage"
                        ref={messageRef}
                        class="alert alert-danger msg alert-none text-center"
                        role="alert"
                      ></div>
                      <div
                        class="alert alert-success msg-success alert-none text-center"
                        role="alert"
                      ></div>
                      <div class="text-center auth-to-acc">
                        <span class="form-check-label">
                          Уже есть аккаунт? <a href="/login">Войти</a>
                        </span>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Registration;
