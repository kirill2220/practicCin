/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import $ from "jquery";
import Sidebar from "../../../components/sidebar/sidebar";
import Navbar from "../../../components/header/header";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Store from "../../../store/store";
import logo from "../../../images/user.png";
import DataFilm from "../../../components/DataFilm/DataFilm";
import SidebarUser from "../../../components/sidebar/sidebarUser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Film = () => {
  import("./Film.css");
  useEffect(() => {
    const elements = $(".session-data");
    elements.click(function () {
      $(".session-selected").removeClass("session-selected");
      $(this).addClass("session-selected");
      $(`.total-seats`).html(" ");
      added_seat.length = 0;
      fullPrice = 0;
      countTicket = 0;
    });
  });

  const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];
  const store = new Store();
  const location = useLocation();
  const IdFilm = location.state.ID;
  const [data, setData] = useState([]);
  const [dataFilms, setdataFilms] = useState([]);
  const [dataFavorite, setdataFavorite] = useState([]);
  const [dataGenre, setdataGenre] = useState([]);
  const [dataImage, setdataImage] = useState([]);
  const [dataSession, setdataSession] = useState([]);
  const [dataPlaces, setdataPlaces] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await store.GetDataFilm(IdFilm);
      const fav = await store.GetFavFilm(IdFilm);
      const users = await store.GetUserById();
      localStorage.getItem("errorTicket")
        ? toast(
            `Сожалею,но данные места уже куплены билеты: ${localStorage.getItem(
              "errorTicket"
            )}`
          )
        : console.log(localStorage.getItem("errorTicket"));
        console.log(localStorage.getItem("errorTicket"));
      localStorage.removeItem("errorTicket");
      setData(users.data);
      setdataFavorite(fav.data);
      setdataFilms(res.data.films);
      setdataGenre(res.data.films.genre);
      setdataImage(res.data.films.img.data);
      setdataSession(res.data.sessions);
      setdataPlaces(res.data.places);
    };
    fetchData();
  }, []);

  let expensive_seats = [];
  let added_seat = [];

  let occupied_seats_global = [];
  let fullPrice = 0;
  let countTicket = 0;

  let IdSession = 0;
  let IdHall = 0;

  async function writeHole(
    row,
    count_seats,
    occupied_seats,
    minn,
    maxx,
    idsession,
    idhall
  ) {
    occupied_seats_global = occupied_seats;
    expensive_seats.length = 0;
    let seat = 1;
    let expensiveRowStart = Math.round(row * 0.2);
    let expensiveRowEnd = row - expensiveRowStart;
    let expensiveSeatsInRowStart = Math.round(count_seats * 0.2);
    let expensiveSeatsInRowEnd = count_seats - expensiveSeatsInRowStart;

    let occupiedSeatsClass = "";
    let seatType = "Standard";

    let $holeBlock = $(".hole-block");
    $holeBlock.html("");
    $(".selected-seats").html("");
    $(".total-seats").html("");

    for (let i = 1; i <= row; i++) {
      let $rowOfSeats = $(
        `<div value="${row}" class="row row-of-seats row-of-seats-${i}"></div>`
      );
      $holeBlock.append($rowOfSeats);

      for (let n = 1; n <= count_seats; n++) {
        if (
          i > expensiveRowStart &&
          i <= expensiveRowEnd &&
          n > expensiveSeatsInRowStart &&
          n <= expensiveSeatsInRowEnd
        ) {
          expensive_seats.push(seat);
        }

        for (let k = 0; k < occupied_seats.length; k++) {
          let x = Number(occupied_seats[k]);
          if (seat === x) {
            occupiedSeatsClass = "occupied_seats";
          }
        }
        let seat1 = seat;
        let $seat = $(
          `<div class="col seat ${occupiedSeatsClass} seat_${seat}">${seat}</div>`
        );
        $seat.on("click", () => selectSeat(seat1, i, minn, maxx, idsession));
        $rowOfSeats.append($seat);

        seat++;
        occupiedSeatsClass = "";
      }
    }

    /*Вывод пользователей*/
    let $bodyusers = $(".bodyusers");
    $bodyusers.html("");
    const userFilmsSession = await store.GetUserIntoSession(idsession);
    setdataPlaces(userFilmsSession.data);
  }

  function selectSeat(seat, row, priceMin, priceMax, idsession) {
    let testSeat = false;
    let price = 0;

    for (let i = 0; i < added_seat.length; i++) {
      if (added_seat[i] == seat) {
        testSeat = true;
      }
    }

    /*Проверка занятых мест*/
    let occupiedSeatTrue = false;
    for (let k = 0; k < occupied_seats_global.length; k++) {
      let x = Number(occupied_seats_global[k]);
      if (seat === x) {
        occupiedSeatTrue = true;
      }
    }

    /*Проверка дешевых/дорогих мест*/
    let highCost = false;
    for (let k = 0; k < expensive_seats.length; k++) {
      let x = Number(expensive_seats[k]);
      if (seat === x) {
        highCost = true;
      }
    }

    if (highCost) {
      price = priceMax;
    } else {
      price = priceMin;
    }

    if (occupiedSeatTrue) {
    } else if (testSeat == true) {
      const index = added_seat.indexOf(seat);
      if (index > -1) {
        added_seat.splice(index, 1);

        $(`.seat_${seat}`).removeClass("sel-sead-item");
        $(`.seat-${seat}`).remove();

        fullPrice -= price;
        countTicket -= 1;

        let $finalisum = $(
          `<div><p>Итого: ${countTicket} Билетов на сумму ${fullPrice} р.</p></div>`
        );
        let $order = $(
          `<button class="btn btn-primary col-sm-3" >Оформить заказ</button>`
        );
        $order.on("click", () => AddOrders(added_seat, idsession));
        $finalisum.append($order);

        $(`.total-seats`).html($finalisum);
      }
    } else {
      added_seat.push(seat);

      $(`.seat_${seat}`).addClass("sel-sead-item");

      $(`.selected-seats`).append(`
        <div class="selected-seat col-sm-2 seat-${seat}">
        <p>Ряд: ${row}, Место: ${seat}</p>
        <p>Тип места: Стандарт</p>
        <p>Стоимость: ${price} р.</p>
        </div>`);

      fullPrice += price;
      countTicket += 1;

      let $finalisum = $(
        `<div><p>Итого: ${countTicket} Билетов на сумму ${fullPrice} р.</p></div>`
      );
      let $order = $(
        `<button class="btn btn-primary col-sm-3" >Оформить заказ</button>`
      );
      $order.on("click", () => AddOrders(added_seat, idsession));
      $finalisum.append($order);

      $(`.total-seats`).html($finalisum);
    }

    //console.log(added_seat);
  }

  async function AddOrders(tickets, sessions) {
    const tickorder = await store.BuyTicket(tickets, sessions);
    console.log(tickorder.data);
    let data = [];
    tickorder.data.map((item) => data.push(item.place.place));
    if (data.length !== 0) {
    localStorage.setItem(
      "errorTicket",
      `${data}`
    );
    }
    window.location.reload();
  }

  async function Dellorder(id) {
    const neworder = await store.Dellorder(id);
    setdataPlaces(neworder.data);
  }

  return (
    <div className="wrapper">
      <ToastContainer />
      <Sidebar logo={logo} />

      <div className="main">
        <Navbar logo={logo} />

        <main className="content">
          <div className="container-fluid p-0">
            <div className="row">
              <div className="col-xl-12 col-xxl-12 d-flex">
                <div className="w-100">
                  <div className="row card">
                    <div className="container mt-5">
                      {dataFilms.genre !== null ? (
                        <DataFilm
                          data={dataFilms}
                          dataName={dataGenre}
                          dataImage={dataImage}
                          dataFavorite={dataFavorite}
                        />
                      ) : null}
                      <div className="row booking-block">
                        <h3 className="text-center">Доступные сеансы</h3>
                        <div className="select-session">
                          {dataSession.map((item) => (
                            <button
                              className="session-data"
                              type="submit"
                              onClick={() =>
                                writeHole(
                                  item.hall.count_rows,
                                  item.hall.count_place,
                                  item.ticket?.map(
                                    (ticket) => ticket.place.place
                                  ),
                                  item.hall.typeplace.cost_normal,
                                  item.hall.typeplace.cost_vip,
                                  item.id,
                                  item.idhall
                                )
                              }
                            >
                              <p className="session-day">
                                {new Date(item.datesession).getDate()}
                              </p>
                              <p className="session-month">
                                {months[new Date(item.datesession).getMonth()]}
                              </p>
                              <p className="session-time">
                                {String(
                                  new Date(item.timesession).getUTCHours()
                                ).padStart(2, "0")}
                                :
                                {String(
                                  new Date(item.timesession).getMinutes()
                                ).padStart(2, "0")}
                              </p>
                            </button>
                          ))}
                        </div>
                        <div className="hole">
                          <h2 className="hole-title"></h2>
                          <div className="container hole-block"></div>
                        </div>
                        <div className="selected-seats row"></div>
                        <div className="total-seats row"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {data.status === "Admin" ? (
                <div className="col-xl-12 col-xxl-12 d-flex">
                  <div className="w-100">
                    <div className="row card">
                      <div id="all-users-block" className="container mt-5">
                        <h3 className="text-center">Пользователи</h3>
                        <table id="data-table " className="table table-striped">
                          <thead>
                            <tr>
                              <th>Логин</th>
                              <th>Имя</th>
                              <th>Место</th>
                              <th>Удалить</th>
                            </tr>
                          </thead>
                          <tbody id="bodyusers"></tbody>
                          {dataPlaces?.map((item) => (
                            <tr>
                              <td>{item.users.login}</td>
                              <td> {item.users.name}</td>
                              <td> {item.place.place}</td>
                              <td>
                                <button
                                  class="btn btn-danger text-center danclass"
                                  onClick={() => Dellorder(item.id)}
                                >
                                  <i class="bi bi-x-square"></i>
                                </button>
                              </td>
                            </tr>
                          ))}
                          <tfoot>
                            <tr>
                              <th>Логин</th>
                              <th>Имя</th>
                              <th>Место</th>
                              <th>Удалить</th>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Film;
