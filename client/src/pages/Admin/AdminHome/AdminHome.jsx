/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import "../../../css/app.css";
import "../../../lib/bootstrap/css/bootstrap.min.css";
import "../../../lib/bootstrap-icons/bootstrap-icons.css";
import "../../../lib/boxicons/css/boxicons.min.css";
import "../../../lib/datatables/datatables.min.css";
import "../../../css/cinemaDataTable.css";
import Store from "../../../store/store";
import { useState, useEffect } from "react";
import Sidebar from "../../../components/sidebar/sidebar";
import Navbar from "../../../components/header/header";
import logo from "../../../images/user.png";
import TablePag from "../../../components/pagination/TablePag";
const AdminHome = () => {
  import("./AdminHome.css");

  const store = new Store();

  const [data, setData] = useState([]);
  const [trig, settrig] = useState(false);
  const [credentials, setCredentials] = useState({
    search: undefined,
  });
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  useEffect(() => {
    const fetchData = async () => {
      const res = await store.GetFilm();
      setData(res.data);
    };
    fetchData();
  }, []);

  const Search = async (e) => {
    e.preventDefault();
    try {
       const res = await store.GetFilmByName(credentials);
           setData(res.data);
           settrig(true)
    } catch (error) {
      console.log(error)
    }
   
  };

  return (
    <div className="wrapper">
      <Sidebar logo={logo} />

      <div className="main">
        <Navbar logo={logo} />

        <main className="content">
          <div className="container-fluid p-0">
            <h1 className="h3 mb-3 text-center">
              <strong>Dreamcinema</strong>
            </h1>

            <div className="row">
              <div className="row">
                <div className="container">
                  <div className="card search-block">
                    <div className="card-body">
                      <div className="row search-content">
                        <div className="col mt-0">
                          <h4 className="text-center">Найди свой фильм</h4>
                          <form className="form-inline my-2 my-lg-0 justify-content-center">
                            <input
                              onChange={handleChange}
                              className="form-control col-sm-10 mr-sm-2"
                              type="search"
                              id="search"
                              placeholder="Что искать"
                              aria-label="Search"
                            />
                            <button
                              onClick={Search}
                              className="btn btn-outline-success my-2 my-sm-0 col-sm-1"
                              type="submit"
                            >
                              Найти
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div></div>
            <div id="divfilm">
              <div className="row">
                <div className="col-xl-12 col-xxl-12 d-flex">
                  <div className="w-100">
                    <div className="container mt-5">
                      
                      {data?.length >= 1||trig ? <TablePag data={data} /> : null}
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

export default AdminHome;
