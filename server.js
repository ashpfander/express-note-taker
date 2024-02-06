// Grabs express and path packages
const express = require('express');
const path = require('path');

// Initializes the use of express.js
const app = express();

// Sets a port for the server from express.js
const PORT = process.env.PORT || 3001;

// Route to be able to grab everything from public folder
app.use(express.static('public'));

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// GET route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// Catch all GET route for homepage
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// Let's express.js listen to the port so it runs the server and generates page(s)
app.listen(PORT, () =>
    // Logs the message in console letting user know it's working
    console.log(`App listening at http://localhost:${PORT}`)
);