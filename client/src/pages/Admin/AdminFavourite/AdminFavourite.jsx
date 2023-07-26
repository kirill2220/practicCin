/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Sidebar from "../../../components/sidebar/sidebar";
import Navbar from "../../../components/header/header";
import { useState, useEffect } from "react";
import Store from "../../../store/store";
import logo from "../../../images/user.png";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";
import SidebarUser from "../../../components/sidebar/sidebarUser";
const AdminFavourite = () => {
  const store = new Store();
  const navigate = useNavigate();
  const [data, setdata] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await store.GetFavoriteFilm();
      setdata(res.data);
    };
    fetchData();
  }, []);
  function handleClick(id) {
    navigate("/Film", { state: { ID: id } });
  }
  return (
    <div class="wrapper">
      <Sidebar logo={logo} />

      <div class="main">
        <Navbar logo={logo} />
        <main class="content">
          <div class="container-fluid p-0">
            <h1 class="h3 mb-3 text-center">
              <strong>Любимые</strong>
            </h1>

            <div class="row">
              <div class="col-xl-12 col-xxl-12 d-flex">
                <div class="w-100">
                  <div className="container mt-5">
                    <table id="data-table" class="table ">
                      <tbody id="filmbody" class="row">
                        {data?.map((item) => (
                          <tr class="col-md-4">
                            <td>
                              <div class="col-md-12">
                                <div class="profile-card">
                                  <a onClick={() => handleClick(item.film.id)}>
                                    <img
                                      id={item.film.id}
                                      src={`data:image/jpeg;base64,${Buffer.from(
                                        item.film.img.data
                                      ).toString("base64")}`}
                                      class="img img-responsive"
                                    />

                                    <div class="profile-name">
                                      {item.film.name}
                                    </div>
                                    <div class="profile-username">
                                      {item.film.year}
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
        </main>
      </div>
    </div>
  );
};

export default AdminFavourite;
