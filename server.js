import express, { response } from "express";
import cors from "cors";
import mysql from "mysql";
import http, { request } from "http";
import cookieParser from "cookie-parser"; // Import cookie-parser
import nodemailer from "nodemailer";

const app = express();
const server = http.createServer(app);

app.use(cors({
  credentials: true,
  origin: "*"
}));

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser()); // Use cookie-parser middleware


// -----live host-------

// const connection = mysql.createConnection({

//     host : "db4free.net",
//     user : "vcentry",
//     password : "test@123",
//     database : "vcentry",    //travelix
//     port : 3306
// });
 

// ------Xampp----

const connection = mysql.createConnection({

    host : "db4free.net",
    user : "vcentry",
    password : "test@123",
    database : "travelix",
    port : 3306
})



  const sql_query = `INSERT INTO vcentry_contact (username, useremail, userphoneno, usercourse, usermessage)
  VALUES('${request.body.username}', '${request.body.useremail}', '${request.body.userphoneno}', '${request.body.usercourse}', '${request.body.usermessage}')`;
   connection.query(sql_query, (error, result) => {
        if (error) {
            response.status(500).send(error);
        }
        else {
            response.status(200).send("Contact Form Sent");
        }
    })
})

//-----------------------------------------------------------------------------------------------------------
//URL - http://localhost:5000/api/delete/contact
//Method : DELETE

app.delete("/api/delete/contact/:id", (request, response) => {
  const sql_query = `DELETE FROM vcentry_contact WHERE id=${request.params.id}`;
  connection.query(sql_query, (error, result) => {
    if(error){
      response.status(500).send(error);
    }
    else{
      response.status(200).send("Deleted successfully");
    }
  })
})

const portNumber = process.env.PORT || 5000;
server.listen(portNumber, () => {
    console.log("server is running")
})

