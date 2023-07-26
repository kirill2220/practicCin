/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import { useState, useEffect, useMemo } from "react";
import { Buffer } from "buffer";
import { useNavigate } from "react-router-dom";
function TablePag(props) {
  const navigate = useNavigate();
  useEffect(() => {
    const scripts = [
      "//dreamcinema:3000/lib/datatables/load/AdminHomeCinema.js",
    ];

    scripts.forEach((src) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      document.body.appendChild(script);
    });
  }, []);
  function handleClick(id) {
    navigate("/Film", { state: { ID: id } });
  }
  return (
    <table id="data-table" class="table ">
      <thead>
        <tr>
          <th></th>
        </tr>
      </thead>
      {}
      <tbody id="filmbody" class="row">
        
        {props.data?.map((item) => (
          <tr class="col-md-4">
            <td>
              <div class="col-md-12">
                <div class="profile-card">
                  <a onClick={() => handleClick(item?.id)}>
                    <img
                      id={item?.id}
                      src={`data:image/jpeg;base64,${Buffer.from(
                        item?.img.data
                      ).toString("base64")}`}
                      class="img img-responsive"
                    />

                    <div class="profile-name">{item?.name}</div>
                    <div class="profile-username">{item?.year}</div>
                  </a>
                </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TablePag;
