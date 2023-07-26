/* eslint-disable default-case */
/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Sidebar from "../../../components/sidebar/sidebar";
import Navbar from "../../../components/header/header";
import { useRef, useState, useEffect } from "react";
import Store from "../../../store/store";
import logo from "../../../images/user.png";
const ChatAdmin = () => {
  import("./ChatAdmin.css");
  const store = new Store();
  useEffect(() => {
    const scripts = ["//dreamcinema:3000/js/script.js"];

    scripts.forEach((src) => {
      const script = document.createElement("script");
      script.src = src;
      script.id='2222';
      script.async = true;
      document.body.appendChild(script);
    });
  }, []);
  localStorage.setItem("trig",true);

  return (
    <>
      <div class="wrapper">
        <Sidebar logo={logo} />

        <div class="main">
          <Navbar logo={logo} />
          <main class="content">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div id="chat">
                    <div className="col-sm-3">
                      <div id="indicator">Users</div>
                      <div id="users"></div>
                    </div>

                    <div id="interface" className="col-sm-9">
                      <div id="indicator">Chat</div>
                      <div id="messages"></div>
                      <div id="control-chat">
                        <input
                          className="form-control"
                          id="input"
                          type="text"
                          name="user_message"
                        />
                        <input
                          className="btn btn-outline-success"
                          id="send"
                          type="button"
                          value="Отправить"
                        />
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

export default ChatAdmin;
