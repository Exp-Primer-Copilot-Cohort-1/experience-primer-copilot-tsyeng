// Create web server

// Require modules
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

// Use bodyParser
app.use(bodyParser.urlencoded({extended: true}));

// Set view engine
app.set('view engine', 'pug');

// Set path to views
app.set('views', './views');

// Read comments.json file
const comments = JSON.parse(fs.readFileSync('comments.json'));

// Get route
app.get('/', (req, res) => {
    res.render('index', {comments: comments});
});

// Post route
app.post('/comments', (req, res) => {
    const comment = req.body.comment;
    comments.unshift(comment);
    fs.writeFileSync('comments.json', JSON.stringify(comments));
    res.redirect('/');
});

// Listen on port 3000
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});