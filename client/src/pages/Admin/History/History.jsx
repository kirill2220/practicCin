/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Sidebar from "../../../components/sidebar/sidebar";
import Navbar from "../../../components/header/header";
import React, { useEffect, useState } from "react";
import Store from "../../../store/store";
import logo from "../../../images/user.png";
const History = () => {
  const store = new Store();
  const [data, setdata] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await store.GetHistory();
      setdata(res.data);
    };
    fetchData();
  }, []);
  return (
    <div class="wrapper">
      <Sidebar logo={logo} />

      <div class="main">
        <Navbar logo={logo} />
        <main class="content">
          <div class="container-fluid p-0">
            <h1 class="h3 mb-3">
              <strong>История действий всех пользователей</strong>
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
                          <div id="midf" class="mb-0">
                            <table
                              id="data-table-history"
                              class="table table-striped"
                            >
                              <thead>
                                <tr>
                                  <th>Логин</th>
                                  <th>Имя</th>
                                  <th>Действие</th>
                                  <th>Фильм</th>
                                  <th>Дата показа</th>
                                  <th>Дата действия </th>
                                  <th>Место</th>
                                </tr>
                              </thead>
                              <tbody id="bodyuser">
                                {data.map((item) => (
                                  <tr>
                                    <td>{item.users_audit.login}</td>
                                    <td>{item.users_audit.name}</td>
                                    <td>{item.operationtype}</td>
                                    <td>{item.filmname}</td>
                                    <td>
                                      {new Date(item.date)
                                        .getDate()
                                        .toString()
                                        .padStart(2, "0")}
                                      .
                                      {(new Date(item.date).getMonth() + 1)
                                        .toString()
                                        .padStart(2, "0")}
                                      .
                                      {new Date(item.date)
                                        .getFullYear()
                                        .toString()}
                                    </td>
                                    <td>
                                      {new Date(item.datenow)
                                        .getDate()
                                        .toString()
                                        .padStart(2, "0")}
                                      .
                                      {(new Date(item.datenow).getMonth() + 1)
                                        .toString()
                                        .padStart(2, "0")}
                                      .
                                      {new Date(item.datenow)
                                        .getFullYear()
                                        .toString()}
                                    </td>
                                    <td>{item.place}</td>
                                  </tr>
                                ))}
                              </tbody>
                              <tfoot>
                                <tr>
                                  <th>Логин</th>
                                  <th>Имя</th>
                                  <th>Действие</th>
                                  <th>Фильм</th>
                                  <th>Дата показа</th>
                                  <th>Дата действия </th>
                                  <th>Место</th>
                                </tr>
                              </tfoot>
                            </table>
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

export default History;
