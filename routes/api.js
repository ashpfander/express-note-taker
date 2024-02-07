const api = require('express').Router();

// Grabs file system packages and db.json info
const fs = require('fs');
const db = require('../db/db.json');

// Helper method for generating unique ids
const uuid = require('../helpers/uuid.js');

// GET Route for retrieving all the data from db.json file and return all saved notes
api.get('/api/notes', (req, res) => {
    fs.readFromFile(db).then((data) => res.json(JSON.parse(data)));
});

// POST Route for adding a new note
api.post('/api/notes', (req, res) => {
    console.log(req.body);
  
    const { title, text } = req.body;
  
    if (req.body) {
        const newNote = {
            title,
            text,
            note_id: uuid,
        };
  
        fs.readAndAppend(newNote, db);
        res.json(`New note has been added!`);
    } else {
        res.error('Note has not been added.');
    }
});

// DELETE Route for deleting a specific note
api.delete('/api/notes/:note_id', (req, res) => {
    const noteId = req.params.note_id;
    fs.readFromFile(db)
        .then((data) => JSON.parse(data))
        .then((json) => {
            // Make a new array of all updated notes
            const result = json.filter((note) => note.note_id !== noteId);
  
            // Rewrite new array to the db.json file
            fs.writeToFile(db, result);
  
            // Respond to the DELETE request
            res.json(`${noteId} has been deleted!`);
    });
});

module.exports = api;