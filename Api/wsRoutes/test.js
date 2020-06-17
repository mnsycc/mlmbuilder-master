// const io = require('wsServ');
// const path = require('path');

// io.to('u123').emit({ order: 12, status: 'success' });

// const groups = {};

// io.on('connection', (socket) => {
//   // io.use((socket, next) => {
//   //   const cookies = cookie.parse(socket.request.headers.cookie || '');
//   //   if (cookies.jwt) {
//   //     // проверяем JWT
//   //     const uid = 123;
//   //     socket.join(`u${uid}`);
//   //   }

//   //   next();
//   // });

//   socket.on('test', (data, cb) => {
//     console.log('its work!', data);
//   });


//   socket.on('article/get', (data, cb) => {
//     const articles = {
//       1: 'Lorem 1',
//       2: 'Lorem 2',
//       3: 'Lorem 3',
//     };

//     const { id } = data;
//     const article = articles[id];
//     console.log(article);

//     cb(article);
//   });
// });
