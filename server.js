import express from "express";
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

const connection = mysql.createConnection({

    host : "db4free.net",
    user : "vcentry",
    password : "test@123",
    database : "travelix",
    port : 3306
})




const portNumber = process.env.PORT || 5000;
server.listen(portNumber, () => {
    console.log("server is running")
})

