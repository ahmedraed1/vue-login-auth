const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const testing = require("./methods/testInputs");
const bodyParser = require("body-parser");
const getSecret = require("./methods/user_auth");
require("dotenv").config();
let app = express();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root", // username
  password: "", // password of database
  database: "auth", // name of database
});

connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to database!");
  }
});

const corsOptions = {
  origin: "http://localhost:5173", // Change this to the actual origin of your web application
  credentials: true,
};
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors(corsOptions));

app.post("/auth/login", (req, res) => {
  const { input, password } = req.body;

  const user = {
    input: input,
    password: password,
  };

  if (testing.testInput(input, password) == "E") {
    let sql = `SELECT email , password FROM accounts`;
    connection.query(sql, (error, result) => {
      if (error) res.send(error);
      else {
        let find = result.find(
          (item) => item.email === input && item.password === password
        );
        if (find) {
          res
            .status(200)
            .send(getSecret.jwtSign(user, process.env.ACCESS_SECRET_KEY, "1h"));
        } else {
          res.send(false);
          console.log("no");
        }
      }
    });
  } else if (testing.testInput(input, password) == "U") {
    let sql = `SELECT username , password FROM accounts`;
    connection.query(sql, (error, result) => {
      if (error) res.send(error);
      else {
        let find = result.find(
          (item) => item.username === input && item.password === password
        );
        if (find) {
          res
            .status(200)
            .send(getSecret.jwtSign(user, process.env.ACCESS_SECRET_KEY, "1h"));
        } else {
          res.send(false);
          console.log("no");
        }
      }
    });
  }
});

app.post("/auth/register", (req, res) => {
  const name = mysql.escape(req.body.firstName);
  const surname = mysql.escape(req.body.surname);
  const age = mysql.escape(req.body.age);
  const username = mysql.escape(req.body.username);
  const email = mysql.escape(req.body.email);
  const password = mysql.escape(req.body.password);

  const user = {
    input: req.body.email,
    password: req.body.password,
  };

  let sql = `INSERT INTO accounts(name,surname,username,email,password,time,age) VALUES (${name},${surname},${username},${email},${password},NOW(),${age})`;
  connection.query(sql, (error, results) => {
    if (error) res.status(404).send(false);
    else res.send(getSecret.jwtSign(user, process.env.ACCESS_SECRET_KEY, "1h"));
  });
});

app.get("/auth/test", getSecret.authenticateToken, (req, res) => {
  res.send(req.user);
});

app.post("/auth/data", (req, res) => {
  const { password } = req.body;
  let sql = `SELECT name FROM accounts WHERE password = '${password}'`;
  connection.query(sql, (error, result) => {
    if (error) {
      res.send("ERROR! , Failed getting data");
    } else {
      res.send(result[0]);
    }
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is listening on localhost:${port}`);
});
