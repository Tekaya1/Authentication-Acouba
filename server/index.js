var nodemailer = require('nodemailer');
var ReactDOM = require('react-dom');
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const sessions = require("express-session");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const fileUpload = require('express-fileupload');
const app = express();
const jwt = require('jsonwebtoken')
const storage = require('node-sessionstorage');
const path = require('path');
const random = require('random');
const crypto = require('crypto')
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
//serving public file
app.use(express.static(__dirname));
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST","PUT"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
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

app.use(sessions({
  key:"PassReset",
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
      "INSERT INTO auth(Name,SurName,username, password, Email, Phone, Gender) VALUES (?,?,?,?,?,?,?,?)",
      [name,Surname,username, hash, email,Phone,Gender],
      (err, result) => {
        if (err) {
        
          res.send(err)
        } else {
        
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
        res.send({auth:false, message :'you are not authenticated'})
      } else{
        req.userid = decoded.id
        next()
      }
    });
  }
}
const verifyJWTPassword= (req, res, next) => {
  const tokenPassword = req.headers["x-access-token"]
    if(!tokenPassword) {
      res.send('you need a token')
    } else {
      jwt.verify(tokenPassword, "jwtsecretPass" , (err, decoded) =>{
        if(err){
          res.send({Status:false, message :'Reset failed', err:err })
        } else{
          req.userid = decoded.id
          next()
        }
      });
    }
  }

  app.get('/ResetVerif',verifyJWTPassword,(req,res)=> {
    res.send({Status:true, message :'Reset Success' })
  });

  app.post('/ResetPassword', (req,res)=> {
    const token = crypto.randomBytes(64).toString('hex');
    const email = req.body.email; 
    const randomPassword =
    Math.random().toString(36).slice(2) + "@##+%$*+#%&!*#!$%&#=#!=+%*#&**@%=+@%*%=%@&@*!@$$%*#*#=@$@++%==&**&#$+$+@+="+ Math.random().toString(36).slice(2)+"$*$++!#@%@#$!$@&@*+++#*%+*"; 
    try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
          user: 'ocie.gleason14@ethereal.email',
          pass: 'CcgXUuWhhK2KbYDthM'
      }
  });
    db.query("Select * from auth where Email = ? ",[email],(err1,result2)=> {
            if(result2.length>0) {
              const id = result2[0].id
              const queryData = "insert into rst (REmail,RCode,TokenReset) values (?,?,?)";
              const tokenPassword  = jwt.sign({id},'jwtsecretPass', {
                expiresIn:200,
              })
              storage.setItem('tokenPassword', tokenPassword)
              
              db.query(queryData,[email,randomPassword,storage.getItem('tokenPassword')],(err,result)=>{
                if(result2.length>0) {
                  transporter.sendMail({
                    from: '"Fred Foo 👻" <foo@example.com>', // sender address
                    to: "bar@example.com, baz@example.com", // list of receivers
                    subject: `reset Code`, // Subject line
                    text: `This is your reset Code: ${randomPassword}`, // plain text body
                    html:`<body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
                    
                    <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
                        style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
                        <tr>
                            <td>
                                <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                                    align="center" cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td style="height:80px;">&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td style="text-align:center;">
                                          <a href="https://rakeshmandal.com" title="logo" target="_blank">
                                            <img width="60" src="https://www.keejob.com/media/recruiter/recruiter_14534/logo-14534-20190523-090022.png" title="logo" alt="logo">
                                          </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="height:20px;">&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                                style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                                <tr>
                                                    <td style="height:40px;">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td style="padding:0 35px;">
                                                        <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">You have
                                                            requested to reset your password</h1>
                                                        <span
                                                            style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                                        <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                                            Hello and Welcome To Acoba Reset Section , Here They are your reset Code 
                                                        </p>
                                                        <a href="javascript:void(0);"
                                                            style="background:#1ba6d4;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">${randomPassword}</a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="height:40px;">&nbsp;</td>
                                                </tr>
                                            </table>
                                        </td>
                                    <tr>
                                        <td style="height:20px;">&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td style="text-align:center;">
                                            <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy; <strong>www.acoba.com</strong></p>
                                            <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                            Here is a temporary security code for your Acoba Account. It can only be used once within the next 4 minutes, after which it will expire:
                                        </p>
                                            </td>
                                    </tr>
                                    <tr>
                                        <td style="height:80px;">&nbsp;</td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                   
                </body>`
                  });
                  
                  res.send({result: result2 , tokenPassword:tokenPassword})
                }else {
                  res.send(err)
                }
              })           
            } else {
              res.send(err1)
            }
    }) 
  } catch (error) {
    console.log(error);
  }
  })


app.get('/UserIsAuth',verifyJWT,(req,res)=> {
  res.send({auth:true, message :'you are authenticated' })
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
            res.send({auth: true, token: token, result: result, expiresIn: 300})
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
 
      const query = "insert into congerequest (username,Email,TypeConge,Requests,StartDate,EndDate,Name,SurName,Status,Comment) values (?,?,?,?,?,?,?,?,?,?)"
      db.query(query,[user,Email,Select,TextArea,StartDate,EndDate,Name,Surname,"No Action","No Comment"],(err,result)=> {
        res.send(result)
      })
})


app.post('/Data', (req,res)=> {
  Select = req.body.list
  console.log(Select);
  const queryData = "select * from conges where TypeCON= ?"
  db.query(queryData,[Select],(err,result)=>{
    if(err) {
      res.send(err)
    }else {
      res.send(result)
      
      
    }
  })
})

app.post('/EmailFetch', (req,res)=> {
  const queryData = "select * from auth where Email= ?"
  db.query(queryData,[storage.getItem('emailid')],(err,result)=>{
    if(err) {
      res.send(err)
    }else {
      res.send(result) 
    }
  })
})
app.post('/RequestFetch/:id', (req,res)=> {
  const id= req.params.id
  const queryData = "select * from congerequest where id= ?"
  db.query(queryData,id,(err,result)=>{
    if(err) {
      res.send(err)
    }else {
      res.send(result) 
    }
  })
})




app.post("/VerifyCode",(req,res) => {
  const code = req.body.code
  db.query("select * from rst where RCode = ? and TokenReset = ?",[code,storage.getItem('tokenPassword')],(err,result)=>{
      if(err) {
        res.send(err)
      }else {
        res.send(result);
      } 
  })
})
app.post('/ForwardResetPassword', (req,res)=> {
  const NewPassword= req.body.NewPassword
  const queryData = "UPDATE AUTH SET password = ? where Email = ?";
  bcrypt.hash(NewPassword,saltRounds, (err, hash) => {
  db.query(queryData,[hash,storage.getItem('PassReset')],(err,result)=>{
    if (err) {
      res.send(err)
    }else {
      storage.removeItem('PassReset')
      res.send(result);
    }
    
    
  })
})
})


app.post('/ListConge', (req,res)=> {
  const queryData = "select * from CongeRequest where Email= ?"
  db.query(queryData,[storage.getItem('emailid')],(err,result)=>{
    if(err) {
      res.send(err)
    }else {
      res.send(result)
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
      res.send(err)
    }else {
      res.send(result)
     
      
      
    }
  })
})


app.put("/Admin/StatusApproved", (req,res) =>{
  const id = req.body.id
  const comment = req.body.Comment
  db.query("UPDATE congerequest set Status = ?, Comment=? where id = ?",["Approved",comment,id],(err,result)=>{
    if(err){
      res.send(err);
    } else {
      res.send(result)    }
  })
})

app.put("/Admin/StatusDeclined", (req,res) =>{
  const id = req.body.id
  const comment = req.body.Comment
db.query("UPDATE congerequest set Status = ?, Comment=? where id = ?",["Declined",comment,id],(err,result)=>{
    if(err){
      res.send(err);
    } else {
      res.send(result)    }
  })
})

app.put("/UpdateRequest/:id", (req,res) =>{
  const id = req.params.id
    const Name = req.body.Name
    const Surname = req.body.SurName
    const user = req.body.username 
    const Select = req.body.Select
    const TextArea = req.body.TextArea
    const StartDate = req.body.StartDate
    const EndDate = req.body.EndDate
db.query("UPDATE congerequest set username = ? ,	Name = ? ,	SurName = ? ,	TypeConge = ? ,	Requests = ? ,	StartDate = ?,	EndDate = ? where id = ?",
[user,Name,Surname,Select,TextArea,StartDate,EndDate,id],(err,result)=>{
    if(err){
      res.send(err);
    } else {
      res.send(result)    }
  })
})

app.post("/DELETE", (req,res) =>{
  const id = req.body.id
db.query("DELETE FROM congerequest where id = ?",id,(err,result)=>{
    if(err){
      res.send(err);
    } else {
      res.send(result)    }
  })
})

app.put("/UpdateUser", (req,res) =>{
  const id = req.body.id
  const name = req.body.Name
  const Surname = req.body.SurName
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.Email
  const Phone = req.body.Phone
  const Gender = req.body.Gender
  bcrypt.hash(password,saltRounds, (err, hash) => {
  db.query("UPDATE auth set Name = ?, SurName= ?, username= ?, password= ?, Email= ?, Phone= ?, Gender= ? where id = ?",
  [name,Surname,username,hash,email,Phone,Gender,id],(err,result)=>{
    if(err){
      res.send(err)
    } else {
      res.send(result)    
    }
  })
})
 })

app.post('/imgupload', (req, res) => {
 
  
  if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
  }

  let targetFile = req.files.imgfile;
  let extName = path.extname(targetFile.name);
  const num= random.int(10000,999999);
   let uploadDir = path.join(__dirname, '../client','public','upload', num+targetFile.name);
  let imgList = ['.png','.jpg','.jpeg','.jfif'];
  // Checking the file type

  if(!imgList.includes(extName)  ){
      return res.json({submit:false,msg:"Only jpg ,jpeg and png"})
  }

  if(targetFile.size > 2000000 ){
     
     return res.json({submit:false,msg:"File should be less then 2 MB "})
  }
  targetFile.mv(uploadDir, (err) => {
      if (err)
      {
          return res.status(500).send(err);
      }
      else{
              if (err)
              {
                  return res.status(500).send(err);
              }
              else{
                const password = req.body.password;
                bcrypt.hash(password,saltRounds, (err, hash) => {
                  const imgname=num+targetFile.name
                  const data={
                    Name:req.body.Name,
                    SurName:req.body.SurName,
                    username:req.body.username,
                    password:hash,
                    Email:req.body.Email,
                    Phone:req.body.Phone,
                    Gender:req.body.Gender,
                    image:imgname
                  
                  };
                  
                  let sql="INSERT INTO `auth` SET ?";
                  db.query(sql,data,(err,result)=>{
                      if(err)
                      {
                          res.send(err);
                      }
                      else{ 
                          res.send(result);
                          // // res.send()
                          // res.json({submit:true,fliname:targetFile.name,name:data.name,email:data.email,newimg:newimgFile.name})
              
                      }
                  })
              }
                )}
      }

  });

});

app.post('/logout',(req,res) => {
  const result = storage.removeItem('emailid'); 
  storage.removeItem("token")
  res.send(result)
})












app.listen(3001, () => {
  console.log("running server");
});
