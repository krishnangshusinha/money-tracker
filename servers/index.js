/*
    Username --> krishnangshusinha15
    Password --> QLNJYUn3AjSxCULZ
*/

const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const cors = require("cors");
const TransactionModel = require("./models/Transactions");

require("./connect");   // connecting our server with database

app.use(cors());                // for no problem in frontend to backend connectivity
app.use(express.json());        // is a middleware function that is used to parse JSON data sent in the request body.

app.post("/api/transaction" , async (req, res) => {
    
    const {name , price , description , datetime} = req.body;

    const transaction = await TransactionModel.create(req.body);  // creating my collection with the model made out of the schema

    res.send(transaction);
});

app.get("/api/transaction" , async (req, res) => {
    
    const transactions = await TransactionModel.find();     // getting all the datas from our database
    res.json(transactions);      // sending the json data

})

app.listen((port) , ()=>{
    console.log(`Server listening at port ${port}`);
})