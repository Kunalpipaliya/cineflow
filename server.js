const express=require('express')
const app=express()

app.get("/",(req,res)=>{
    res.render('app.ejs')
})
app.listen("2026")