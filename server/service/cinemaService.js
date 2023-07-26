const { PrismaClient } = require("@prisma/client");
const conn = new PrismaClient();
const ApiError = require("../exception/apierror");
const moment = require("moment");
class cinemaService {
  async getAllFilm() {
    const films = await conn.film.findMany({});
    return films;
  }
  async GetHistory() {
    const films = await conn.auditt.findMany({
      include: { users_audit: true },
    });
    return films;
  }
  async DeleteFilm(idFilm) {
    const filmdel = await conn.film.delete({
      where: {
        id: parseInt(idFilm),
      },
    });
    const films = await conn.film.findMany({});
    return films;
  }
  async Dellorder(id, idsession) {
    const filmdel = await conn.ticket.delete({
      where: {
        id: parseInt(id),
      },
    });
    const userinfo = await conn.ticket.findMany({
      where: {
        idsession: idsession,
      },
      include: { users: true, place: true,session:true },
    });
    const filteredData = userinfo.filter(
      (item) => item.session.status === "Active"
    );

    return filteredData;
  }
  async addFilm(
    name,
    year,
    duration,
    age,
    date_of_start,
    date_of_end,
    genre,
    description,
    poster
  ) {
    const [hours, minutes] = duration.split(":");
    const date = new Date();
    date.setUTCHours(hours, minutes, 0, 0);
    let genres = await conn.genre.findFirst({
      where: { name: genre },
    });

    if (!genres) {
      // Если жанр не существует, то создаем новый
      genres = await conn.genre.create({
        data: { name: genre },
      });
    }

    const films = await conn.film.create({
      data: {
        name: name,
        year: parseInt(year),
        duration: date,
        startrelease: new Date(date_of_start),
        endrelease: new Date(date_of_end),
        description: description,
        agelimit: parseInt(age),
        idgenre: genres.id,
        img: poster,
      },
    });
  }
  async getDataFilm(IdFilm) {
let result = await conn.$queryRaw`SELECT CheckSession()`;
    let places = [];
    const films = await conn.film.findFirst({
      where: {
        id: parseInt(IdFilm),
      },
      include: { genre: true },
    });

    const sessions = await conn.session.findMany({
      where: {
        idfilm: parseInt(IdFilm),
        status: "Active",
      },
      include: {
        hall: {
          include: { typeplace: true },
        },
        ticket: {
          include: { place: true },
        },
      },
    });
    return { films, sessions };
  }
  async GetFavFilm(idf, id) {
    let places = [];
    const films = await conn.favorite.findFirst({
      where: {
        idfilm: parseInt(idf),
        idusers: parseInt(id),
      },
    });

    return films;
  }
  async GetFilmByName(search) {

 const films = await conn.film.findMany({
      where: {
        name: {
          contains: search,
        },
      },
    });

    return films;
  }
  async GetFavoriteFilm(id) {
    const films = await conn.favorite.findMany({
      where: {
        idusers: parseInt(id),
      },
      include: { film: true },
    });
    return films;
  }
  async AddHall(name, coastvip, coastnorm, seats, rows) {
    let typePlace = await conn.typeplace.findFirst({
      where: {
        cost_normal: parseInt(coastnorm),
        cost_vip: parseInt(coastvip),
      },
    });

    if (!typePlace) {
      typePlace = await conn.typeplace.create({
        data: {
          cost_normal: parseInt(coastnorm),
          cost_vip: parseInt(coastvip),
        },
      });
    }

    const hall = await conn.hall.create({
      data: {
        name: name,
        count_place: parseInt(seats),
        count_rows: parseInt(rows),
        id_type_plase: typePlace.id,
      },
    });

    const rowCount = parseInt(seats) * parseInt(rows);
    for (let i = 1; i <= rowCount; i++) {
      await conn.place.create({
        data: {
          place: i,
          idhall: hall.id,
        },
      });
    }
    return hall;
  }
  async GetFilmHall() {
    const films = await conn.film.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    const halls = await conn.hall.findMany({});
    return { films, halls };
  }
  async GetGenreFilm() {
    const genre = await conn.genre.findMany({});
    return genre;
  }
  async addFavorite(idfilm, id) {
    const fav = await conn.favorite.create({
      data: {
        idfilm: parseInt(idfilm),
        idusers: parseInt(id),
      },
    });
    return fav;
  }
  async removeFavorite(idfilm, id) {
    const fav = await conn.favorite.deleteMany({
      where: {
        idfilm: parseInt(idfilm),
        idusers: parseInt(id),
      },
    });
    return fav;
  }
  async DeleteTicket(idTicket, idUser) {
    const tickdel = await conn.ticket.delete({
      where: {
        id: parseInt(idTicket),
      },
    });

    const tick = await conn.ticket.findMany({
      where: {
        idusers: parseInt(idUser),
      },
      include: {
        place: { select: { place: true } },
        session: {
          include: {
            film: {
              select: { name: true },
            },
            hall: { select: { name: true } },
          },
        },
      },
    });
const filteredData = tick.filter((item) => item.session.status === "Active");

    return filteredData;
  }
  async GetFilmGenre(idGenre) {
    const genre = await conn.genre.findMany({
      where: {
        id: idGenre,
      },
      include: { film: true },
    });
    return genre;
  }
  async GetUserIntoSession(idsession) {
    const userinfo = await conn.ticket.findMany({
      where: {
        idsession: idsession,
      },
      include: { users: true, place: true },
    });
    return userinfo;
  }
  async GetTicketUser(iduser) {
    const tick = await conn.ticket.findMany({
  where: {
    idusers: parseInt(iduser),
  },
  include: {
    place: { select: { place: true } },
    session: {
      include: {
        film: {
          select: { name: true },
        },
        hall: { select: { name: true } },
      },
    },
    users: true,
  },
});
const filteredData = tick.filter((item) => item.session.status === "Active");
    return filteredData;
  }
  async getDataFreeHall(date, hole) {
    const Session = await conn.session.findMany({
      where: {
        datesession: new Date(date),
        idhall: parseInt(hole),
      },
      include: { film: true },
    });
    return Session;
  }
  async AddSession(time, film, hole, date) {
    const [hours, minutes] = time.split(":");
    const times = new Date();
    times.setUTCHours(hours, minutes, 0, 0);

    const Session = await conn.session.create({
      data: {
        datesession: new Date(date),
        timesession: times,
        idhall: parseInt(hole),
        idfilm: parseInt(film),
      },
    });
  }
  async checkExistence(...args) {
    let errors = [];
    for (let arg of args) {
      if (arg[0] == "undefined" || !arg[0]) {
        errors.push(arg[1]);
      }
    }
    return errors;
  }
  async checkHallName(name) {
    const halls = await conn.hall.findFirst({
      where: {
        name: name,
      },
    });
    return halls;
  }
  async checkValidation(...args) {
    let errors = [];
    for (let arg of args) {

      if (arg[0] <= 0) {
        errors.push(arg[1]);
      }
    }
    return errors;
  }
  async checkValidationOver(...args) {
    let errors = [];
    for (let arg of args) {

      if (arg[0] <= 0 || arg[0] > 12) {
        errors.push(arg[1]);
      }
    }
    return errors;
  }
  async BuyTicket(tickets, sessions, id) {
    try {
      let massOccupied=[];
         for (let i = 0; i <= tickets.length - 1; i++) {
           const pl = await conn.place.findFirst({
             include: {
               hall: {
                 include: {
                   session: {
                     where: {
                       id: parseInt(sessions),
                     },
                   },
                 },
               },
             },
             where: {
               place: tickets[i],
             },
           });
           
const checkTicket = await conn.ticket.findFirst({
  where:{
    idplace:pl.id,
    idsession:sessions,
  },
  include:{place:true}
})

if(checkTicket==null){
      const tick= await conn.ticket.create({
             data: {
               idusers: parseInt(id),
               idplace: pl.id,
               idsession: sessions,
             },
           });
           console.log(tick);
          }else{
massOccupied.push(checkTicket);
          }
         }
        return massOccupied;
    } catch (error) {
      console.log(error);
    }
 

  }
}

module.exports = new cinemaService();
