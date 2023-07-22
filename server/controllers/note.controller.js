const { Note } = require('../models/note.model');
module.exports.index = (request, response) => {
    response.json({
        message: "Hello World"
    });
}
//create Note
module.exports.createNote = (request, response) => {
    const { title, body } = request.body;
    Note.create({
        title,
        body
    })
        .then(note => response.json(note))
        .catch(err => response.json(err));
}
//get All Notes
module.exports.getAllNotes = (request, response) => {
    Note.find({})
       .then(notes => response.json(notes))
       .catch(err => response.json(err));
}
//update Note
module.exports.updateNote = (request, response) => {
    Note.findOneAndUpdate({_id: request.params.id}, request.body, {new:true, runValidators: true})
        .then(updatedNote => response.json(updatedNote))
        .catch(err => response.json(err))
}
//get Note
module.exports.getNote = (request, response) => {
    Note.findOne({_id: request.params.id})
      .then(note => response.json(note))
      .catch(err => response.json(err))
}
delete Note
module.exports.deleteNote = (request, response) => {
    Note.deleteOne({_id: request.params.id})
       .then(deletedNote => response.json(deletedNote))
       .catch(err => response.json(err))
}






//check unique title
module.exports.checkTitleUniqueness = async (request, response) => {
    const { title } = request.params;
    try {
      // Check if the title already exists in the database
      const existingNote = await Note.findOne({ title });
  
      // If the note with the same title exists, it is not unique
      const isUnique = !existingNote;
  
      response.json({ isUnique });
    } catch (error) {
      console.error('Error checking title uniqueness:', error);
      response.status(500).json({ error: 'An error occurred while checking title uniqueness.' });
    }
  };