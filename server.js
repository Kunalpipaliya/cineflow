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

app.get("/admin",(req,res)=>{
    const qry = "select * from cineflow";

  sql.query(qry, (err, data) => {
    if (err) throw err;

    res.render("showcard.ejs", { data });
  });
  })
  
  

app.get("/admin/insertcard", (req, res) => {
  res.render("insertcard.ejs");
});

app.get("/createData", (req, res) => {
  const { title, image, year, director, genre, description,trailer } = req.query;
  
  const qry = `INSERT INTO cineflow (title,image,year,director,genre,description,trailer) VALUES ('${title}','${image}',${year},'${director}','${genre}','${description}','${trailer}')`;
  
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

app.get("/trailer/:cid",(req,res)=>{
  const id=req.params.cid

  const qry=`select * from cineflow where cid=${id}`
   sql.query(qry,(err,data)=>{
    if(err) throw err
    res.render('trailer.ejs',{data})
  })
})

app.get("/admin/deletecard/:cid",(req,res)=>{
  const id=req.params.cid
  const qry=`delete from cineflow where cid = ${id}`
  sql.query(qry,(err)=>{
    if(err) throw err
    console.log("deleted successfully!");
    res.redirect("/admin")
  })
})

app.get("/admin/editcard/:cid",(req,res)=>{
  const id=req.params.cid
  const qry=`select * from cineflow where cid=${id}`
  sql.query(qry,(err,editdata)=>{
    if(err) throw err
    console.log(editdata);
    res.render("updatecard.ejs",{editdata})
  })
})


app.get("/admin/updatecard",(req,res)=>{
  const {cid,title,image,year,director,genre,description,trailer}=req.query

  const qry=`update cineflow set title='${title}',image='${image}',year=${year},director='${director}',genre='${genre}',description='${description}',trailer='${trailer}' where cid=${cid} `

  sql.query(qry,(err)=>{
    if(err) throw err
    console.log("data updated successfully!");
    res.redirect("/admin")
    
  })
})

app.listen("2026");
