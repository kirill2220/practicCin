import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/app.css";
import "../../css/global_style.css";
import "../../css/forms.css";
import React, { useRef } from "react";
import Store from "../../store/store";
import logo from "../../images/user.png";
const Login = () => {
  const [credentials, setCredentials] = useState({
    login: undefined,
    password: undefined,
  });
  const navigate = useNavigate();
  const messageRef = useRef(null);
  const inputPasswordRef = useRef(null);
  const inputLoginRef = useRef(null);
  const store = new Store();
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      inputPasswordRef.current.classList.remove("error");
      inputLoginRef.current.classList.remove("error");
      messageRef.current.classList.add("alert-none");
      const res = await store.login(credentials.login, credentials.password);

      navigate("/AdminHome");
    } catch (err) {
      let error = err.response.data;

      if (error.errors) {
        if (error.errors.includes("password")) {
          inputPasswordRef.current.classList.add("error");
        }
        if (error.errors.includes("login")) {
          inputLoginRef.current.classList.add("error");
        }
      }

      messageRef.current.classList.remove("alert-none");
      document.getElementById("errorMessage").innerHTML =
        err.response.data.message;
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
                <p class="lead">Войдите в свой аккаунт для продолжения</p>
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
                          pattern="[a-zA-Z0-9]+"
                          placeholder="Введите ваш логин"
                          onChange={handleChange}
                          required
                        />
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
                      </div>
                      <div
                        id="errorMessage"
                        ref={messageRef}
                        class="alert alert-danger msg alert-none text-center"
                        role="alert"
                      ></div>
                      <div class="text-center mt-3">
                        <button
                          class="login-but btn btn-lg btn-primary"
                          type="submit"
                          name="login"
                          value="login"
                          onClick={handleClick}
                        >
                          Войти
                        </button>
                      </div>

                      <div class="text-center auth-to-acc">
                        <span class="form-check-label">
                          Еще нет аккаунта? <a href="/">Зарегистрироваться</a>
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

export default Login;
