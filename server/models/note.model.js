const mongoose = require('mongoose');
const NoteSchema = new mongoose.Schema(
    {
    title: { 
        type: String,
     required: [true, 'Title is required'],
     minLength: [2, 'Title must be at least 2 characters long']
    },
    body: { 
        type: String,
        required: [true, 'Body is required'],
        maxLength: [255, 'Body must be less than 255 characters long']

     },
    
}, { timestamps: true });
module.exports.Note = mongoose.model('Note', NoteSchema);
