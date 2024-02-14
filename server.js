import express, { response } from "express";
import cors from "cors";
import mysql from "mysql";
import http,{request} from "http";


const app = express();
const server = http.createServer(app);

app.use(cors({
    credentials : true,
    origin : "*"

}));

app.use(express.json({limit : "10mb"}));


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
    host : "localhost",
    user : "root",
    password : "",
    database : "vcentry"
   
});


connection.connect((error) => {

    if(error){
        throw error;

    }

    else{
        console.log("MySQL connected");
    }

});



// ---------------------------courses-API-POST---------------------------------



app.post("/api/create/courses",(request,response) => {
    const sql_query = `INSERT INTO vcentry_courses (coursesFiled , coursesName , coursesDetail , coursesImage) VALUES ('${request.body.coursesFiled}', '${request.body.coursesName}', '${request.body.coursesDetail}', '${request.body.coursesImage}')`;

    connection.query(sql_query,(error, result) => {
        if(error){
            response.status(500).send(error);
        }
        else{
            response.status(200).send("detail has been uploaded");
        }
    })
});




// --------------------------trend-courses-Api-POST----------------------------


app.post("/api/create/trend",(request,response) => {
    const sql_query = `INSERT INTO vcentry_trend_courses (coursesFiled , coursesName , coursesDetail , coursesImage) VALUES ('${request.body.coursesFiled}', '${request.body.coursesName}', '${request.body.coursesDetail}', '${request.body.coursesImage}')`;

    connection.query(sql_query,(error, result) => {
        if(error){
            response.status(500).send(error);
        }
        else{
            response.status(200).send("detail has been uploaded");
        }
    })
});


// --------------------------------courses-API-GET-------------------------------



app.get("/api/list/courses", (request, response) => {
    const sql_query = `SELECT * FROM vcentry_courses` ;
    connection.query(sql_query,(error, result) => {
        if(error){
            response.status(500).send(error);
        }
        else{
            response.status(200).send(result);
        }
    })
});



// --------------------------------trend-API-GET-------------------------------



app.get("/api/list/trend", (request, response) => {
    const sql_query = `SELECT * FROM vcentry_trend_courses` ;
    connection.query(sql_query,(error, result) => {
        if(error){
            response.status(500).send(error);
        }
        else{
            response.status(200).send(result);
        }
    })
});


// --------------------------------courses-API-Delete-------------------------------

app.delete("/api/delete/courses/:id", (request, response) => {
    const sql_query = `DELETE FROM vcentry_courses WHERE id=${request.params.id}`;
    connection.query(sql_query,(error, result) => {
        if(error){
            response.status(500).send(error);
        }
        else{
            response.status(200).send("Deleted Successfully");
        }
    })
});




// --------------------------------trend-API-Delete-------------------------------

app.delete("/api/delete/trend/:id", (request, response) => {
    
    const sql_query = `DELETE FROM vcentry_trend_courses WHERE id=${request.params.id}`;
    
    connection.query(sql_query,(error, result) => {
        if(error){
            response.status(500).send(error);
        }
        else{
            response.status(200).send("Deleted Successfully");
        }
    })
});
 






const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log("server is running");
})

