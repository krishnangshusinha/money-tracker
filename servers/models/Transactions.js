const mongoose = require("mongoose");

// creating a schema for our datas
const TransactionSchema = new mongoose.Schema({

    name:{type:String , required: true},
    price:{type:Number , required: true},
    description:{type:String , required: true},
    datetime:{type:Date}

})

const TransactionModel = mongoose.model("transaction" , TransactionSchema)

module.exports= TransactionModel;