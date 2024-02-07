const api = require('express').Router();

// Grabs file system and path packages
const fs = require('fs');
const path = require('path');

// Helper method for generating unique ids
const uuid = require('../helpers/uuid.js');

// GET Route for retrieving all the data from db.json file and return all saved notes
api.get('/notes', (req, res) => {
    fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
        if (err) {
          // If there's an error, it returns an error message
          console.error(err);
          return res.status(500).json({ error: 'There has been an error' });
        }
    
        try {
          // Parse the file contents as JSON
          const notes = JSON.parse(data);
          // Send the notes as the response
          res.json(notes);
        } catch (err) {
          // If there's an error, it returns an error message
          console.error(err);
          return res.status(500).json({ error: 'There has been an error' });
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
            note_id: uuid,
        };
  
        fs.readAndAppend(newNote, '../db/db.json');
        res.json(`New note has been added!`);
    } else {
        res.error('Note has not been added.');
    }
});

// DELETE Route for deleting a specific note
api.delete('/notes/:note_id', (req, res) => {
    const noteId = req.params.note_id;
    fs.readFile(path.join(__dirname, '../db/db.json'))
        .then((data) => JSON.parse(data))
        .then((json) => {
            // Make a new array of all updated notes
            const result = json.filter((note) => note.note_id !== noteId);
  
            // Rewrite new array to the db.json file
            fs.writeToFile('../db/db.json', result);
  
            // Respond to the DELETE request
            res.json(`${noteId} has been deleted!`);
    });
});

module.exports = api;