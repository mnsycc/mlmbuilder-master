// конфигурация базы данных
module.exports = {
  db: {
    uri: 'mongodb://localhost:27017/BaseApp',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
};
