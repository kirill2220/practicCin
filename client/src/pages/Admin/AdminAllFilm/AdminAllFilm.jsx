/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Navbar from "../../../components/header/header";
import Sidebar from "../../../components/sidebar/sidebar";
import Store from "../../../store/store";
import { useState, useEffect } from "react";
    import logo from '../../../images/user.png'
const AdminAllFilm = () => {
  const store = new Store();

  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await store.GetFilm();
      setData(res.data);
    };
    fetchData();
  }, []);
  async function DeleteFilm(idFilm) {
    const res = await store.DeleteFilm(idFilm);
    setData(res.data);
  }
  return (
    <div class="wrapper">
      <Sidebar logo={logo} />

      <div class="main">
        <Navbar logo={logo} />
        <main class="content">
          <div class="container-fluid p-0">
            <h1 class="h3 mb-3">
              <strong>Пользователи</strong>
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
                              id="data-table-films"
                              class="table table-striped"
                            >
                              <thead>
                                <tr>
                                  <th>Название</th>
                                  <th>год</th>
                                  <th>Удалить</th>
                                </tr>
                              </thead>
                              <tbody id="bodyFilm">
                                {data?.map((item) => (
                                  <tr>
                                    <td>{item.name}</td>
                                    <td>{item.year}</td>
                                    <td>
                                      <button
                                        class="btn btn-outline-primary"
                                        onClick={() => DeleteFilm(item.id)}
                                      >
                                        Удалить
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                              <tfoot>
                                <tr>
                                  <th>Название</th>
                                  <th>год</th>
                                  <th>Удалить</th>
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

export default AdminAllFilm;
