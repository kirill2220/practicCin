/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import $ from "jquery";
import Sidebar from "../../../components/sidebar/sidebar";
import Navbar from "../../../components/header/header";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Store from "../../../store/store";
import logo from "../../../images/user.png";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";
import SidebarUser from "../../../components/sidebar/sidebarUser";
const GenreFilm = () => {
  const [dataFilms, setdataFilms] = useState([]);
  const store = new Store();
  const navigate = useNavigate();
  const location = useLocation();
  const IdGenre = location.state.ID;
  const GenreName = location.state.GenreName;

  useEffect(() => {
    const fetchData = async () => {
      const res = await store.GetFilmGenre(IdGenre);
      setdataFilms(res.data[0].film);
    };
    fetchData();
  }, []);

  function handleClick(id) {
    navigate("/Film", { state: { ID: id } });
  }

  return (
    <div className="wrapper">
      <Sidebar logo={logo} />

      <div className="main">
        <Navbar logo={logo} />

        <main className="content">
          <div className="container-fluid p-0">
            <h1 class="h3 mb-3 text-center">
              <strong>{GenreName}</strong>
            </h1>

            <div id="divfilm">
              <div className="row">
                <div className="col-xl-12 col-xxl-12 d-flex">
                  <div className="w-100">
                    <div className="container mt-5">
                      <table id="data-table" class="table ">
                        <tbody id="filmbody" class="row">
                          {dataFilms?.map((item) => (
                            <tr class="col-md-4">
                              <td>
                                <div class="col-md-12">
                                  <div class="profile-card">
                                    <a onClick={() => handleClick(item.id)}>
                                      <img
                                        id={item.id}
                                        src={`data:image/jpeg;base64,${Buffer.from(
                                          item.img.data
                                        ).toString("base64")}`}
                                        class="img img-responsive"
                                      />

                                      <div class="profile-name">
                                        {item.name}
                                      </div>
                                      <div class="profile-username">
                                        {item.year}
                                      </div>
                                    </a>
                                  </div>
                                </div>
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
  );
};

export default GenreFilm;
