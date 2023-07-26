const cinemaService = require("../service/cinemaService");
const ApiError = require("../exception/apierror");
class cinemaControl {
  async listCinema(req, res, next) {
    try {
      const cinema = await cinemaService.getAllFilm();
      return res.json(cinema);
    } catch (error) {
      next(error);
    }
  }
  async GetHistory(req, res, next) {
    try {
      const cinema = await cinemaService.GetHistory();
      return res.json(cinema);
    } catch (error) {
      next(error);
    }
  }
  async listDataCinema(req, res, next) {
    try {
      const { idFilm } = req.body;
      const cinema = await cinemaService.getDataFilm(idFilm);
      return res.json(cinema);
    } catch (error) {
      next(error);
    }
  }
  async GetFilmByName(req, res, next) {
    try {
      const { search } = req.body;
     
      const cinema = await cinemaService.GetFilmByName(search);
      console.log(cinema);
      return res.json(cinema);
    } catch (error) {
      next(error);
    }
  }
  async GetFavFilm(req, res, next) {
    try {
      const { idFilm } = req.body;
      const cinema = await cinemaService.GetFavFilm(idFilm, req.user.id);
      return res.json(cinema);
    } catch (error) {
      next(error);
    }
  }
  async GetFavoriteFilm(req, res, next) {
    try {
      const cinema = await cinemaService.GetFavoriteFilm(req.user.id);
      return res.json(cinema);
    } catch (error) {
      next(error);
    }
  }
  async GetFilmGenre(req, res, next) {
    try {
      const { idGenre } = req.body;

      const cinema = await cinemaService.GetFilmGenre(idGenre);
      return res.json(cinema);
    } catch (error) {
      next(error);
    }
  }
  async GetTicketUser(req, res, next) {
    try {

      const cinema = await cinemaService.GetTicketUser(req.user.id);
      return res.json(cinema);
    } catch (error) {
      next(error);
    }
  }
  async GetFilmHall(req, res, next) {
    try {
      const cinema = await cinemaService.GetFilmHall();
      return res.json(cinema);
    } catch (error) {
      next(error);
    }
  }
  async GetGenreFilm(req, res, next) {
    try {
      const genre = await cinemaService.GetGenreFilm();
      return res.json(genre);
    } catch (error) {
      next(error);
    }
  }
  async addFilms(req, res, next) {
    try {
      const {
        name,
        year,
        duration,
        age,
        date_of_start,
        date_of_end,
        genre,
        description,
      } = req.body;

      let errors = await cinemaService.checkExistence(
        [name, "name"],
        [year, "year"],
        [duration, "duration"],
        [age, "age"],
        [date_of_start, "date_of_start"],
        [date_of_end, "date_of_end"],
        [genre, "genre"],
        [description, "description"],
        [req.file, "poster"]
      );

      if (!errors.length == 0) {
        throw ApiError.EmptyReq(`Заполните пожалуйста все поля `, errors);
      }
      if (parseInt(year) < 1895) {
        throw ApiError.BadReq("Кино изобрели в 1895 году", ["year"]);
      }
      if (parseInt(age) > 21 || parseInt(age) < 0) {
        throw ApiError.BadReq("Ограничения могут быть от 0 до 21", ["age"]);
      }
      if (date_of_start >= date_of_end) {
        throw ApiError.BadReq(
          "Дата начала проката не может быть позже или равна даты оканчания",
          ["date_of_start", "date_of_end"]
        );
      }
      const poster = req.file.buffer;
      const filmData = await cinemaService.addFilm(
        name,
        year,
        duration,
        age,
        date_of_start,
        date_of_end,
        genre,
        description,
        poster
      );
      return res.json(filmData);
    } catch (error) {
      next(error);
    }
  }
  async AddHall(req, res, next) {
    try {
      const { name, coastvip, coastnorm, seats, rows } = req.body;

      let errors = await cinemaService.checkExistence(
        [name, "name"],
        [coastvip, "coastvip"],
        [coastnorm, "coastnorm"],
        [seats, "seats"],
        [rows, "rows"]
      );

      if (!errors.length == 0) {
        throw ApiError.EmptyReq(`Заполните пожалуйста все поля `, errors);
      }

      let checkHallName = await cinemaService.checkHallName(name);
      if (checkHallName) {
        throw ApiError.BadReq(`Зал с таким именем уже существует`, ["name"]);
      }
      if (parseInt(coastnorm) >= parseInt(coastvip)) {
        throw ApiError.BadReq(
          `Вип места не могут стоить столько же сколько и обычные  `,
          ["coastnorm", "coastvip"]
        );
      }
      let val = await cinemaService.checkValidation(
        [coastvip, "coastvip"],
        [coastnorm, "coastnorm"],
        [seats, "seats"],
        [rows, "rows"]
      );
      if (!val.length == 0) {
        throw ApiError.BadReq(
          `В данных полях значения должны быть больше 0  `,
          val
        );
      }
      let valOver = await cinemaService.checkValidationOver(
        [seats, "seats"],
        [rows, "rows"]
      );
      if (!valOver.length == 0) {
        throw ApiError.BadReq(
          `В данных полях значения должны быть больше 0 и меньше 12`,
          valOver
        );
      }
      const filmData = await cinemaService.AddHall(
        name,
        coastvip,
        coastnorm,
        seats,
        rows
      );
      return res.json(filmData);
    } catch (error) {
      next(error);
    }
  }
  async DeleteTicket(req, res, next) {
    try {
      const { idTicket } = req.body;
      const ticken = await cinemaService.DeleteTicket(idTicket, req.user.id);

      return res.json(ticken);
    } catch (error) {
      next(error);
    }
  }
  async DeleteFilm(req, res, next) {
    try {
      const { idFilm } = req.body;
      const cinema = await cinemaService.DeleteFilm(idFilm);

      return res.json(cinema);
    } catch (error) {
      next(error);
    }
  }
  async AddSession(req, res, next) {
    try {
      const { time, film, hole, date } = req.body;

      let errors = await cinemaService.checkExistence(
        [time, "time"],
        [film, "film"],
        [hole, "hole"],
        [date, "date"]
      );

      if (!errors.length == 0) {
        throw ApiError.EmptyReq(`Заполните пожалуйста все поля `, errors);
      }
      const FreeHall = await cinemaService.getDataFreeHall(date, hole);
      const cinema = await cinemaService.getDataFilm(film);
      if (cinema.films.endrelease < new Date(date)) {
        throw ApiError.BadReq(`Прокат фильма уже закончен`, ["date"]);
      }
      if (cinema.films.startrelease > new Date(date)) {
        throw ApiError.BadReq(`Прокат фильма еще не начался`, ["date"]);
      }

      const [hours, minutes] = time.split(":");
      const times = new Date();
      times.setUTCHours(hours, minutes, 0, 0);
      let StartTime = times.getUTCHours() * 60 + times.getMinutes();
      let timeFilm =
        cinema.films.duration.getUTCHours() * 60 +
        cinema.films.duration.getMinutes();
      FreeHall.map((item) => {
        let timeOtherSession =
          item.film.duration.getMinutes() +
          item.film.duration.getUTCHours() * 60;
        let timeStartOtherSession =
          item.timesession.getMinutes() + item.timesession.getUTCHours() * 60;
        if (
          timeFilm + StartTime >= timeStartOtherSession &&
          StartTime <= timeOtherSession + timeStartOtherSession
        ) {
          throw ApiError.BadReq(`В данное время в данном зале идет фильм`, [
            "time",
            "hole",
          ]);
        }
      });
      const filmData = await cinemaService.AddSession(time, film, hole, date);
      return res.json(filmData);
    } catch (error) {
      next(error);
    }
  }
  async addFavorite(req, res, next) {
    try {
      const { idfilm } = req.body;
      const filmData = await cinemaService.addFavorite(idfilm, req.user.id);
      return res.json(filmData);
    } catch (error) {
      next(error);
    }
  }
  async Dellorder(req, res, next) {
    try {
      const { id, idsession } = req.body;
      const filmData = await cinemaService.Dellorder(id, idsession);
      return res.json(filmData);
    } catch (error) {
      next(error);
    }
  }
  async removeFavorite(req, res, next) {
    try {
      const { idfilm } = req.body;
      const filmData = await cinemaService.removeFavorite(idfilm, req.user.id);
      return res.json(filmData);
    } catch (error) {
      next(error);
    }
  }
  async BuyTicket(req, res, next) {
    try {
      const { tickets, sessions } = req.body;

      const token = await cinemaService.BuyTicket(tickets, sessions, req.user.id);

      return res.json(token);
    } catch (error) {
      next(error);
    }
  }
  async GetUserIntoSession(req, res, next) {
    try {
      const { idsession } = req.body;

      const token = await cinemaService.GetUserIntoSession(idsession);

      return res.json(token);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new cinemaControl();
