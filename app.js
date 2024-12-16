const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Publisher = require("./models/Publisher");
const Magazine = require("./models/Magazine");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Подключено к MongoDB"))
  .catch((err) => console.error("Ошибка подключения к MongoDB:", err));

async function createData() {
  try {
    const publisher = new Publisher({
      name: "Tech Books",
      location: "San Francisco",
    });
    await publisher.save();

    const magazine = new Magazine({
      title: "JavaScript Weekly",
      issueNumber: 42,
      publisher: publisher._id,
    });
    await magazine.save();

    console.log("Данные успешно созданы");
  } catch (err) {
    console.error("Ошибка:", err);
  }
}
createData();

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
