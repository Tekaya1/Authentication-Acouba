var ReactDOM = require('react-dom');
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const sessions = require("express-session");
const bcrypt = require("bcrypt");
const session = require('express-session');
const saltRounds = 10;
const app = express();
const storage = require('node-sessionstorage')

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
//serving public file
app.use(express.static(__dirname));
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(sessions({
    key:"emailid",
    secret:"Kali",
    resave: false,
    saveUninitialized : false,
    cookie: {
      expires: 60 * 60 * 24,
    },

}))
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "emails",
});


app.post("/register", (req, res) => {
  const name = req.body.Name
  const Surname = req.body.SurName
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.Email
  bcrypt.hash(password,saltRounds, (err, hash) => {
    if(err) {
      console.log(err)
    }
    db.query(
      "INSERT INTO auth(Name,SurName,username, password, Email) VALUES (?,?,?,?,?)",
      [name,Surname,username, hash, email],
      (err, result) => {
        res.send(result)
      }
    );
    })
    
  });



app.get("/login", (req, res) => {
  
  if (req.session.email) {
    res.send({ loggedIn: true , email: req.session.email});
    
  } else {
    res.send({ loggedIn: false });
  }
});


app.post("/login", (req, res) => {
  const password = req.body.password;
  const email = req.body.email
  var  session;
  db.query(
    "SELECT  * FROM auth WHERE Email = ?",
    [email],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length>0) {
        bcrypt.compare(password, result[0].password, (err, response) => {
          if(response)  {
          // session=req.session;
          // session.userid=req.body.email;
            req.session.email = result
            // console.log(req.session.email);
            res.send(result);
          
          } else {
            res.send({ message: "Wrong Email or password "});
          }       
        });
} else {
  res.send({ message: "User Does not exist  "});
}
}
);
});

app.post('/Email/Insert',(req,res) => {
    const Name = req.body.Name
    const Surname = req.body.SurName
    const user = req.body.username 
    const Select = req.body.Select
    const TextArea = req.body.TextArea
    const StartDate = req.body.StartDate
    const EndDate = req.body.EndDate
    const Email = req.body.Email
      const query = "insert into congerequest (username,Email,TypeConge,Requests,StartDate,EndDate,Name,SurName) values (?,?,?,?,?,?,?,?)"
      db.query(query,[user,Email,Select,TextArea,StartDate,EndDate,Name,Surname],(err,result)=> {
        res.send(result)
      })
})


app.post('/Data', (req,res)=> {
  Select = req.body.list
  console.log(Select);
  const queryData = "select * from conges where TypeCON= ?"
  db.query(queryData,[Select],(err,result)=>{
    if(err) {
      console.log(err)
    }else {
      res.send(result)
      // console.log(result)
      
    }
  })
})

app.post('/EmailFetch', (req,res)=> {
  user = req.body.User
  console.log(Select);
  const queryData = "select * from auth where username= ?"
  db.query(queryData,[user],(err,result)=>{
    if(err) {
      console.log(err)
    }else {
      res.send(result)
      console.log(result)
      
    }
  })
})




app.listen(3001, () => {
  console.log("running server");
});
