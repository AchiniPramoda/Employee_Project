const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const requestShema = new Schema({
	title : {
        type: String,
        required: true,
        min: 3,
        max: 255,
    },
    email : {
        type: String,
        required: true,
        min: 3,
        max: 255,
    },
    description: {
        type: String,
        required: true,
        min: 3,
        max: 255,
    },
   status: {
        type: String,
        required: true,
        default: false,
        min: 3,
        max: 255,
    },

});

module.exports = mongoose.model("requests", requestShema);