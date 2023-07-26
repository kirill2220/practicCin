const jwt = require("jsonwebtoken");
const fs = require("fs");
const https = require("https");
const WebSocket = require("ws");
const serverConfig = {
  host: "dreamcinema",
  port: 9000,
};

let options = {
  key: `-----BEGIN PRIVATE KEY-----
MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCrSyx4NNqzf3D5
rBFmMIfTCxvYJsSLlphs3rKWnk2ww556vG+//hham/NITIleB2+HiL756RedDC9h
byOn771y8Nh5wPXxhAmzIzkcx9WpUatJu9RyFjcHeJ3HPDbzQRCbS40mF6Aou8Ww
12tnUqohogZvw+vcbfprMk+aYbVRm+0FudMS68IY6VEplXAu2P4IYEs8AINXxpBN
x2/6ccz0YuVVqkQx8cQodii52Jtpb4YgWGWZJ+H52nnaaOW3kFspfdLr3ZoKjbuH
PhYMAkCx185nL6YriPUidaAIncB0hY6JgdzmjWVTT/B1MCInaOfM2AXgmPlpOIhP
zTgDki2LAgMBAAECggEANEjJ1hcr+kYYEd13oh2GF+D4Ks4KiCD7fZ+sG1VOmXnc
UdJauduxS1b2t0bFVzIl1NTklhuT3ZfujmsCEyyWQxNIwEEp0QJgg5FoyWQlz3zi
L6tpeTlWqq0iW8IBc9aUXxJ8jvf/Ju/Js+TNH8iXrZRrKoo+4BWhrj65FYJlefcC
Sfkh39EEdalr1i2Dl5JZILF/qjGDaiQ3L0bhF1HSmLS4GyuI85jpEPS3dP9aEEec
OfQbeVIvRHfIwMmZcYfiEGaUtwJC9HH4/E5CMCUjGdw9d7DP7dlb6Sy3xwZdz9Ok
j69cgEzvsXyjcfnWa1sl+UdFe5Rc2arWzA9RC9Zo4QKBgQDLbHzS9602+c0p6pOU
iPqu/bbDwK9vBt/9o3LW6qZLavFZxTEGnN/ZSDDY/sqontIEot+w2C2KLoJKQ7Jw
d1m4deD/RoOu14xf6OsfOJg6ADTfuOiL80OopXqK7OyUqxnyQUbdY7pXV0GdU7jN
O94dFU2KIOnPONW3YZGKlKJypQKBgQDXkMykDhpMLM4Ev9WomQvOuJ9jmgP3jUIV
TuEO0jpBkYpPhSpN7EYFKej1t5a9TYmJC9NyfvkbW0BDwAtAOrgZgmk2k0tbEL9b
IOs4x1eOaSkBxoM0PchfjLAg4paKqh/ycXBwFObQX08EQ9ln/6PBZRwIIDRa5Utq
ncl1fmcYbwKBgQCRbsBW+6ektDbPjttvx/ahANaXYLyLvfiJlz9VE3FMXeqq6WXB
eoo3B3uUx6QPpWw00FToU8VLEzEm8vsxmMJWNEBlgP5IE+ZR822VZpq+bMNgZwwq
cgKfIZ9Yj0Yci68DGVQWl2PzaXiJh/+JCxIi7MYAyMMf2VxBvMmWr+jr2QKBgQCY
7dMgeBjT/d1SpT3Q1HL5/ySkprk1wHMnZsRnnWFS7wuuioyOp5atRyRMXiiEuCNg
pJEn40iazcvzxKS2tnGxN0GpRCnrux/maJ43s8Q79gLvjYO7ZjFnCApT6ixex37O
owffnBR7s4H9Rp1QGJ52L2MJqL871PwB8VrhDgHZ5QKBgQCfzMW1Q6Ovi3bN+X1d
3wNep9TDCuYJkjdYKC3PPir09LsretIWqmTSR074tqE9/g/1B0kUPtWc5S9MI0cz
KwSimfYcdONPzF2yT6mWqJXUXIAzNV/6xC1lJleQ+ASktyUcjpZotrrDHyG46sz7
vFVio8F0k2VuMSBYnUM0iWplLQ==
-----END PRIVATE KEY-----`,
  cert: `-----BEGIN CERTIFICATE-----
MIIEGDCCAoCgAwIBAgIRANuvoWaqNdcFdbp/h+UITGIwDQYJKoZIhvcNAQELBQAw
ZTEeMBwGA1UEChMVbWtjZXJ0IGRldmVsb3BtZW50IENBMR0wGwYDVQQLDBRLSVJJ
TExcS2lyaWxsQEtpcmlsbDEkMCIGA1UEAwwbbWtjZXJ0IEtJUklMTFxLaXJpbGxA
S2lyaWxsMB4XDTIzMDUxNTE0NTQzM1oXDTI1MDgxNTE0NTQzM1owSDEnMCUGA1UE
ChMebWtjZXJ0IGRldmVsb3BtZW50IGNlcnRpZmljYXRlMR0wGwYDVQQLDBRLSVJJ
TExcS2lyaWxsQEtpcmlsbDCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEB
AKtLLHg02rN/cPmsEWYwh9MLG9gmxIuWmGzespaeTbDDnnq8b7/+GFqb80hMiV4H
b4eIvvnpF50ML2FvI6fvvXLw2HnA9fGECbMjORzH1alRq0m71HIWNwd4ncc8NvNB
EJtLjSYXoCi7xbDXa2dSqiGiBm/D69xt+msyT5phtVGb7QW50xLrwhjpUSmVcC7Y
/ghgSzwAg1fGkE3Hb/pxzPRi5VWqRDHxxCh2KLnYm2lvhiBYZZkn4fnaedpo5beQ
Wyl90uvdmgqNu4c+FgwCQLHXzmcvpiuI9SJ1oAidwHSFjomB3OaNZVNP8HUwIido
58zYBeCY+Wk4iE/NOAOSLYsCAwEAAaNgMF4wDgYDVR0PAQH/BAQDAgWgMBMGA1Ud
JQQMMAoGCCsGAQUFBwMBMB8GA1UdIwQYMBaAFONabysdDhzNEl9DSSnmZza9GWpI
MBYGA1UdEQQPMA2CC0RyZWFtQ2luZW1hMA0GCSqGSIb3DQEBCwUAA4IBgQAhWmu/
SakB1rykjT2+yS5kj6rTeqFezO4xAGzzKmgmUwsIugkA1bW8GBOHDVglkm+lDviC
QzGGO+pbITKpr2eWpV0V3+jouBD214byjvKAiiW/EPC18bcE3eVkXCQFHNcsyEZg
l6vGOVBYPkEnym3PGk/cwkKHoJFLWYey5joGpIx353wZEG3o4oIg8bV6r36fi0OS
S/5BaMpHXKuQbKtNrtVdJtq7DvPcvwINJB/vbXMpLpRARhJed/vbn2rGu1KyZNDj
DORL3ewaGF/tnFXwo2bkZAAqWg3AoPbnJlqRVok0+QvHTMsdqg+/A4IOPAKa7vnF
b/bUdXUyMFFrz3qYB47SlVLMOqh9mdQGUd7ZyJVwYWfLBJYsJ4QOefs70kxec9GP
sfP9wpfHAy5yJAAeHfaUKvUmtM4xao/k6rZksTKE0ZasaP6Xp330MLuIGQFBNEoL
v0/SGfFG/UwpCYXDZqXKcwR/kDKR8oNwO2/zxDpCbZd1J1EQDG2xOxksp+M=
-----END CERTIFICATE-----`,
};

const server = https.createServer(options);

const wsServer = new WebSocket.WebSocketServer({ server });

server.listen(serverConfig.port, serverConfig.host, () => {
  console.log(`Сервер WebSocket запущен на порту ${serverConfig.port}`);
});

let chats = [];
let manager = null;
let online = false;

class chat {
  messages = [];
  constructor(login, message, socket) {
    this.login = login;
    this.messages.push(message);
    this.socket = socket;
  }
}

class message {
  constructor(login, message) {
    this.login = login;
    this.message = message;
  }
}

wsServer.on("connection", (socket, request, response) => {
  socket.send(JSON.stringify({ online: online }));

  socket.on("close", (status) => {
    const accessToken = getCookies(request);
    console.log(status);
    if (accessToken) {
      let payload = getPayload(socket, { jwt: accessToken });

      if (payload.status === "Admin") {
        online = false;
        manager = null;

        for (const chat of chats) {
          chat.socket.send(JSON.stringify({ online: online }));
        }
      }
    }
  });

  socket.on("message", (mes) => {
    const accessToken = getCookies(request);
    mes.json = JSON.parse(mes);

    if (accessToken) {
      mes.jwt = accessToken;
      mes.payload = getPayload(socket, mes);

      if (mes.payload.status === "Admin") {
        switch (mes.json.action) {
          case "online":
            console.log("online");
            online = true;
            manager = socket;
            chats.forEach((chat) => {
              chat.socket.send(JSON.stringify({ online: online }));

              manager.send(
                JSON.stringify({
                  data: chat.messages,
                })
              );
            });
            break;
          case "response":
            chats.forEach((chat) => {
              if (chat.login === mes.json.login) {
                chat.messages.push(
                  new message(mes.payload.login, mes.json.message)
                );

                chat.socket.send(
                  JSON.stringify({
                    data: [
                      {
                        message: [mes.json.message],
                        login: mes.payload.login,
                        online: online,
                      },
                    ],
                  })
                );

                socket.send(
                  JSON.stringify({
                    data: [
                      {
                        message: [mes.json.message],
                        login: mes.json.login,
                        online: online,
                        name:mes.json.name,
                      },
                    ],
                  })
                );
              }
            });
            break;
        }
      }

      if (mes.payload.status === "User") {
        let exist = false;

        switch (mes.json.action) {
          case "message":
            chats.forEach((chat) => {
              if (chat.login === mes.payload.login) {
                let newMessage = new message(
                  mes.payload.login,
                  mes.json.message
                );
                chat.messages.push(newMessage);

                socket.send(
                  JSON.stringify({
                    data: [
                      {
                        message: [mes.json.message],
                        login: mes.payload.login,
                        online: online,
                      },
                    ],
                  })
                );

                exist = true;
              }
            });

            if (exist === false) {
              let newMessage = new message(mes.payload.login, mes.json.message);
              let createChat = new chat(mes.payload.login, newMessage, socket);

              chats.push(createChat);

              socket.send(
                JSON.stringify({
                  data: [
                    {
                      message: [mes.json.message],
                      login: mes.payload.login,
                      online: online,
                    },
                  ],
                })
              );
            }

            if (manager !== null)
              if (manager.readyState === 1)
                manager.send(
                  JSON.stringify({
                    data: [
                      {
                        message: [mes.json.message],
                        login: mes.payload.login,
                      },
                    ],
                  })
                );
            break;
          case "online":
            chats.forEach((chat) => {
              if (chat.login === mes.payload.login) {
                chat.socket = socket;
                socket.send(
                  JSON.stringify({
                    data: chat.messages,
                  })
                );
              }
            });

            if (manager !== null)
              if (manager.readyState === 1)
                manager.send(
                  JSON.stringify({
                    data: [
                      {
                        message: [mes.json.message],
                        login: mes.payload.login,
                      },
                    ],
                  })
                );
            break;
        }
      }
    }
  });
});

const getCookies = (request) => {
  let cookies = {};
  if (request.headers.cookie) return request.headers.cookie.split("=")[1];
};

const getPayload = (socket, message) => {
  return jwt.decode(message.jwt, { complete: true }).payload;
};

module.exports = { wsServer };

// {
//  "id": 1,
// "login": 'user',
//  "status": 'ENROLLEE',
//   "iat": 1652398380,
//   "exp": 1652401980
// }
