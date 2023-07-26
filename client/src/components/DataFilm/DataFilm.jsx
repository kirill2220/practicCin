/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import $ from "jquery";
import { useState, useEffect, useMemo } from "react";
import { Buffer } from "buffer";
import { useNavigate } from "react-router-dom";
import Store from "../../store/store";
function DataFilm(props) {
    const store = new Store();
    const { endrelease, startrelease, duration } = props.data;
const datafav = props.dataFavorite;
if(datafav===null){

 
  let $btnclick=$(`<button  class="btn favouriteIcon">
                  Добавить в любимые
                  <i class="bi bi-heart-fill align-middle"></i>`)

                      $btnclick.on("click", () =>
                        addFavouriteFilm(props.data.id)
                      );
                  $(".favBtnBlock").html($btnclick);
        }else{
           let $btnclick = $(`<button  class="btn favouriteIconTrue">
                                                Удалить из любимых <i class="bi bi-heart-fill align-middle"></i></button>`);

           $btnclick.on("click", () => removeFavouriteFilm(props.data.id));
           $(".favBtnBlock").html($btnclick);
        }


      async  function addFavouriteFilm(id){
      const res = await store.addFavorite(id);
      
  let $btnclick = $(`<button  class="btn favouriteIconTrue">
                                                Удалить из любимых <i class="bi bi-heart-fill align-middle"></i></button>`);

  $btnclick.on("click", () => removeFavouriteFilm(props.data.id));
  $(".favBtnBlock").html($btnclick);
      }

      async function removeFavouriteFilm(id){
         const res = await store.removeFavorite(id);
          let $btnclick = $(`<button  class="btn favouriteIcon">
                  Добавить в любимые
                  <i class="bi bi-heart-fill align-middle"></i>`);

          $btnclick.on("click", () => addFavouriteFilm(props.data.id));
          $(".favBtnBlock").html($btnclick);
      }
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
    const start = new Date(startrelease);
    const end = new Date(endrelease);
    const len = new Date(duration);

  return (
    <>
      <div class="row">
        <div class="col-md-4">
          <div class="poster">
            <img
              src={`data:image/jpeg;base64,${Buffer.from(
                props.dataImage
              ).toString("base64")}`}
              class="img img-responsive"
            />
          </div>
        </div>
        <div class="col-md-8">
          <div class="info">
            <h1>{props.data.name}</h1>

            <div class="row favIconContainer">
              <div class="col-sm-8">
                <p>
               
                  {`Показ с ${start.getDate()} ${
                    months[start.getMonth()]
                  } ${start.getFullYear()} года по ${end.getDate()} ${
                    months[end.getMonth()]
                  }  ${end.getFullYear()} года`}
                </p>
              </div>
              <div id="favoritebaton" class="col-sm-4 favBtnBlock">
              
               
              </div>
            </div>
            <p>
              {`Длительность:${len.getUTCHours() * 60 + len.getMinutes()} минут`}
            </p>
            <p>Жанр: {props.dataName.name} </p>
            <p>Возрастные ограничения: {props.data.agelimit} + </p>
            <p>Описание: {props.data.description}</p>
          </div>
        </div>
      </div>
    </>
  );
  
}

export default DataFilm;
