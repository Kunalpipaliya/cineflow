const express = require("express");
const app = express();
const mysql = require("mysql");

const sql = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "kp",
});

sql.connect((err) => {
  if (err) throw err;
  console.log("connection success");
});
app.get("/", (req, res) => {
  const qry = "select * from cineflow";

  sql.query(qry, (err, data) => {
    if (err) throw err;

    res.render("app.ejs", { data });
  });
});

app.get("/admin", (req, res) => {
  res.render("admin.ejs");
});

app.get("/createData", (req, res) => {
  const { title, image, year, director, genre, description } = req.query;

  const qry = `INSERT INTO cineflow (title,image,year,director,genre,description) VALUES ('${title}','${image}',${year},'${director}','${genre}','${description}')`;

  sql.query(qry, (err) => {
    if (err) throw err;
    console.log("data enter success");
  });

  res.redirect("/");
});

app.get("/detail/:cid", (req, res) => {
  const id = req.params.cid;

  const qry = `select * from cineflow where cid=${id}`;
  sql.query(qry,(err,data)=>{
    if(err) throw err
    res.render('movie.ejs',{data})
  })

});

app.listen("2026");
