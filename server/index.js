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
const jwt = require('jsonwebtoken')
const storage = require('node-sessionstorage');
const { json } = require('body-parser');
const dateObj = new Date();
var Creation = `Date: ${dateObj.toDateString()} ${dateObj.toTimeString()}`
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
      path: '/',
      expires: 60 * 60 * 24,
      overwrite: false,
      anyKey: '/'
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
  const Phone = req.body.Phone
  const Gender  = req.body.Gender
  bcrypt.hash(password,saltRounds, (err, hash) => {
    if(err) {
      console.log(err)
    }
    db.query(
      "INSERT INTO auth(Name,SurName,username, password, Email, Phone, Gender,CreationDate) VALUES (?,?,?,?,?,?,?,?)",
      [name,Surname,username, hash, email,Phone,Gender,Creation],
      (err, result) => {
        if (err) {
          console.log(err);
          res.send(err)
        } else {
          console.log(result);
          res.send(result)
        }


        
      }
    );
    })
    
  });





const verifyJWT= (req, res, next) => {
const token = req.headers["x-access-token"]
  if(!token) {
    res.send('you need a token')
  } else {
    jwt.verify(token, "jwtsecret" , (err, decoded) =>{
      if(err){
        res.json({auth:false, message :'you are not authenticated' })
      } else{
        req.userid = decoded.id
        next()
      }
    });
  }
}



app.get('/UserIsAuth',verifyJWT,(req,res)=> {
  res.send('you are authenticated')
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
            req.session.email = result
            const id = result[0].id
            const token  = jwt.sign({id},'jwtsecret', {
              expiresIn:300,
            })
            res.json({auth: true, token: token, result: result})
            storage.setItem('emailid', result[0].Email)
            
           
            
          } else {
            res.json({ auth: false, message: "Email or Password Incorrect"});
          }       
        });
} else {
  res.json({ auth: false , message: "User Does not exist  "});
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
  const queryData = "select * from auth where Email= ?"
  db.query(queryData,[storage.getItem('emailid')],(err,result)=>{
    if(err) {
      console.log(err)
    }else {
      res.send(result)
      // console.log(result);
      
      
    }
  })
})
app.get("/Admin/loginAdmin", (req, res) => {
  
  if (req.session.emailAD) {
    res.send({ loggedIn: true , email: req.session.emailAD});
    
  } else {
    res.send({ loggedIn: false });
  }
});



app.post("/Admin/loginAdmin", (req, res) => {
  const passwordAD = req.body.passwordadmin;
  const emailAD = req.body.emailadmin
  db.query(
    "SELECT  * FROM admin WHERE AdminEmail = ? ",
    [emailAD],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length>0) {
        bcrypt.compare(passwordAD, result[0].AdminPassword, (err, response) => {
          if(response)  {
            req.session.emailAD = result
            const id = result[0].id
            const token  = jwt.sign({id},'jwtsecret', {
              expiresIn:300,
            })
            res.json({auth: true, token: token, result: result})
            storage.setItem('emailid', result[0].AdminEmail)

          } else {
          
            res.json({ auth: false, message: "Email or Password Incorrect"});
          }       
        });
} else {
  res.json({ auth: false , message: "User Does not exist  "});
}
}
);
});


app.post('/Admin/List', (req,res)=> {
  const queryData = "select * from congerequest"
  db.query(queryData,(err,result)=>{
    if(err) {
      console.log(err)
    }else {
      res.send(result)
      // console.log(result);
      
      
    }
  })
})






app.post('/logout',(req,res) => {
  const result = storage.removeItem('emailid'); 
  storage.removeItem("token")
  res.send(result)
})



app.listen(3001, () => {
  console.log("running server");
});
