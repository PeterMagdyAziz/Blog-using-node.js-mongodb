const mongoose = require("mongoose");

// defines the data structure 
const Schema = mongoose.Schema;

const blogSchema = Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, { timestamps: true });

// relating the blogs collection to the schema
const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;