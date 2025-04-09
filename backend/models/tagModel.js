const mongoose = require("mongoose");

const tagSchema= new mongoose.Schema({
    name: String,       // 'vegan', 'high-protein', etc.
},
{ timestamps: true }
);

module.exports = mongoose.model("Tag", tagSchema);