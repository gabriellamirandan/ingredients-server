/*const express = require("express");
const app = express();
const list = [];

app.use(express.static("public"));

app.use(
  express.urlencoded({
    extended: true,
  })
);

app
  .route("/api/alimento")
  .post((req, res) => {
    console.log("novo alimento", req.body);
    list.push(req.body);
    console.log(list);
    res.send("alimento cadastrado");
  })
  .get((req, res) => {
    res.send(JSON.stringify(list));
  });

app.listen(3000, () => {
  console.log("porta 3000");
  console.log("minha lista", list);
});*/

const server = require("./src/server");
const db = require("./src/infra/db");

async function start(){
  await db.connect();
  server.listen(3000, () => {
    console.log("porta 3000");
  })
  console.log(38, process.env.MONGO_DATABASE_URL)
  console.log(39, process.env.MONGO_DATABASE_NAME)
};

start();
