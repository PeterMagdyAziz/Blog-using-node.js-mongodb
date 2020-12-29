const express = require("express");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");

// intiating express app instance
const app = express();

// out mongodb server URI
const dbURI = "mongodb+srv://peter_blogs:blogs-test@nodecluster.p39j0.mongodb.net/blogapp?retryWrites=true&w=majority";


// connecting to the mongodb server
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log("connected to db");
        // listen for requests on port 3001
        app.listen(3001);
    }).catch((err) => {
        console.log(err)
    });

// register view engine to ejs
app.set('view engine', 'ejs');
// ejs using myviews to find views
app.set('views', 'myviews');
// setting the static files to be public 
app.use(express.static("public"))
    // for parsing the data passed from form
app.use(express.urlencoded({ extended: true }));

// routing for different pages

// home page
app.get("/", (req, res) => {
    res.render("home", { title: "Home" })
})

//about page
app.get("/about", (req, res) => {
    res.render("about", { title: "About" })
})

// routing for the /blogs url pages
app.use(blogRoutes);

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});