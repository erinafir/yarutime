/*
npx sequelize model:generate --name User --attributes fullName:string,email:string,password:string,gender:string,phoneNumber:string;
npx sequelize model:generate --name Task --attributes title:string,task:string,UserId:integer

*/
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const app = express();



const cors = require('cors')
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', require('./routes')) 
app.use(errorHandler);

module.exports = app