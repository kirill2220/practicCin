/* eslint-disable default-case */
/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Sidebar from "../../../components/sidebar/sidebar";
import Navbar from "../../../components/header/header";
import { useRef, useState, useEffect } from "react";
import logo from "../../../images/user.png";
import SidebarUser from "../../../components/sidebar/sidebarUser";
const Chat = () => {
  import("./Chat.css");

  useEffect(() => {
    const scripts = ["//dreamcinema:3000/js/scriptUser.js"];

    scripts.forEach((src) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      document.body.appendChild(script);
    });
  }, []);

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
                    <div id="indicator">
                      Admin <span> </span>
                      <div id="status"></div>
                    </div>
                    <div id="messages"></div>
                    <div id="chat-control">
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
          </main>
        </div>
      </div>
    </>
  );
};

export default Chat;
