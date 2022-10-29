const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Time = new Schema({
    nome: {
        type: String,
        required: true
    },
    grupo:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now()
    }
})

mongoose.model("times", Time)