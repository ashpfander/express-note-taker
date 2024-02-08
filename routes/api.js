const api = require('express').Router();

// Grabs file system and path packages
const fs = require('fs');
const path = require('path');

// Helper method for generating unique ids
const uuid = require('../helpers/uuid.js');

// GET Route for retrieving all the data from db.json file and return all saved notes
api.get('/notes', (req, res) => {
    fs.readFile(path.join(__dirname, '../db/db.json'), (err, data) => {
        if (err) {
            // If there's an error, console log error and send a message
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            // If all is good, parse the data and send it as a response
            const notes = JSON.parse(data);
            res.json(notes);
        }
    });
});

// POST Route for adding a new note
api.post('/notes', (req, res) => {
    console.log(req.body);
  
    const { title, text } = req.body;
  
    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuid(),
        };

        fs.readFile(path.join(__dirname, '../db/db.json'), (err, data) => {
            if (err) {
                // If there's an error, console log error and send a message
                console.error(err);
                res.error('Note has not been added. Please try again.');
            } else {
                // If all is good, parse the data and add new note to data
                const allData = JSON.parse(data);
                allData.push(newNote);

                fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(allData), (err) =>
                err ? console.error(err) : res.json('New note has been added!')
                );
            }
        });
    }
});

// DELETE Route for deleting a specific note
// api.delete('/notes/:id', (req, res) => {
//     const noteId = req.params.id;
//     fs.readFile(path.join(__dirname, '../db/db.json'))
//         .then((data) => JSON.parse(data))
//         .then((json) => {
//             // Make a new array of all updated notes
//             const result = json.filter((note) => note.id !== noteId);
  
//             // Rewrite new array to the db.json file
//             fs.writeFile(path.join(__dirname, '../db/db.json'), result);
  
//             // Respond to the DELETE request
//             res.json(`${noteId} has been deleted!`);
//     });
// });

module.exports = api;