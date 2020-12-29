// blog routes
const express = require("express");
const Blog = require("../models/blog");

const router = express.Router();

// to fetch all blogs from database and update the blogs page UI
router.get("/blogs", (req, res) => {
    Blog.find().sort({ createdAt: -1 }) // sorted by descending order so i will have the newest on top
        .then((result) => {
            res.render("index", { title: "Blogs", blogs: result })
        }).catch((err) => {
            console.log(err)
        })
})

// to post a blog to database when it is created in the form and submitted
router.post("/blogs", (req, res) => {
    const blog = new Blog(req.body)
    blog.save()
        .then((result) => {
            res.redirect("/blogs")
        }).catch((err) => {
            console.log(err)
        })
})

// routing to create page
router.get("/blogs/create", (req, res) => {
    res.render('create', { title: 'Create a new blog' });
});

//fetching a blog by id to update the UI with that single blog
router.get("/blogs/:id", (req, res) => {
    const id = req.params.id
    Blog.findById(id)
        .then((result) => {
            console.log(result)
            res.render("details", { title: "Blog", blog: result })
        }).catch((err) => {
            console.log(err)
        })
})

// to delete a blog when felete button pressed
router.delete("/blogs/:id", (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then((result) => {
            res.json({ redirect: "/blogs" });
        }).catch((err) => {
            console.log(err)
        })
})

module.exports = router;