require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')
const morgan = require('morgan')
const app = express();

app.use(morgan('dev'))
app.use(cors())
app.use(express.json());
app.use(require("./routes/users.route"));
app.use(require("./routes/todos.route"));
const { PORT, MONGO_SERVER } = process.env;

const connectAndStartServer = async () => {
    try {
      await mongoose.connect(MONGO_SERVER);
  
      app.listen(PORT, () => {
        console.log(`Успешно соединились. Порт ${PORT}`);
      });
    } catch (e) {
      console.log(`Ошибка при подключении: ${e.toString()}`);
    }
  };
  
  connectAndStartServer();