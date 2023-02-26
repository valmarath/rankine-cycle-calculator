const express = require('express');
const cors= require("cors");
const bodyParser= require("body-parser");
const server = express();
const port = 5000;
const Urlpth = require("./router")

server.use(bodyParser.json());
server.use(cors());

//CORS
/* server.use(cors);

server.use(express.json())

const allowedOrigins = ['http://localhost:3000'];

const options = {
    origin: allowedOrigins
};

server.use(cors(options));

server.use(bodyParser.json()); */


server.use("/", Urlpth);
server.listen(port, () => console.log(`Server has started on port: ${port}`));
