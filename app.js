const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended : true}));

mongoose.connect("mongodb://localhost:27017/loginpage",{

}).then(()=>{
    console.log("this is connceted")
}).catch((e)=>{
    console.log("error : "+e);
})
// app.set("view engine" , "hbs")
// app.get("/",(req,res)=>{
//     res.render("index");
// })

const noteschema={
    user : String,
    pass : String,
}

const Note = mongoose.model("Note", noteschema);


app.get("/home", (req,res)=>{
    res.sendFile(__dirname +"/index.html")
})
app.post("/home", (req,res)=>{
    let newnote = new Note({
        user : req.body.user,
        pass : req.body.pass
        
    });
    newnote.save();
    res.redirect("/success");
})
app.get("/success", (req,res) =>{
    res.sendFile(__dirname + "/success.html")
})
app.listen(80, ()=>{
    console.log("conncetion is sucssfull!...")
})