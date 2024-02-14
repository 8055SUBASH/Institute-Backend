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

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "vcentry"
});

const transporter = nodemailer.createTransport({
  service: 'gmail', // e.g., 'gmail', 'yahoo', etc.
  auth: {
      user: '11199a225@kanchiunv.ac.in',
      pass: 'subash8055',
  },
});

connection.connect((error) => {
    if (error) {
      throw error;
    }
    else {
      console.log("MYSQL Server has been connected");
    }
  })

// ---------------------------------------------------------------------------------------------------------
// http://localhost:5000/api/read/review - this method is used in review frontend page
// Method : GET

app.get("/api/read/review", (request, response) => {
  const sql_query = `SELECT * FROM vcentry_review`;
  connection.query(sql_query, (error, result) => {
    if (error) {
      response.status(500).send(error);
    }
    else {
      response.status(200).send(result);
    }
  })
})  
// ---------------------------------------------------------------------------------------------------------
// http://localhost:5000/api/read/contact - this method is used in contact frontend page
// Method : GET

app.get("/api/read/contact", (request, response) => {
  const sql_query = `SELECT * FROM vcentry_contact`;
  connection.query(sql_query, (error, result) => {
    if (error) {
      response.status(500).send(error);
    }
    else {
      response.status(200).send(result);
    }
  })
})  

// ---------------------------------------------------------------------------------------------------------
// http://localhost:5000/api/create/review - this method is used in review frontend page
// Method : POST

app.post("/api/create/review", (request, response) => {

    const sql_query = `INSERT INTO vcentry_review (Name, Email, Course, Message) 
    VALUES ('${request.body.Name}', '${request.body.Email}', '${request.body.Course}', '${request.body.Message}')`;

    connection.query(sql_query, (error, result) => {
        if (error) {
            response.status(500).send(error);
        }
        else {
            response.status(200).send("Review has been updated");
        }
    })
})

// ---------------------------------------------------------------------------------------------------------
// http://localhost:5000/api/submit/contact - this method is used in contact frontend page
// Method : POST

app.post("/api/create/contact", (request, response) => {


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

// ---------------------------------------------------------------------------------------------------------
const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log("Server is Running");
})

