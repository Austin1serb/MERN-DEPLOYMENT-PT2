const NoteController = require('../controllers/note.controller');
module.exports = function(app){
    app.get('/api', NoteController.index);
    app.get('/api/note', NoteController.getAllNotes);
    app.get('/api/note/:id', NoteController.getNote);
    app.post('/api/note', NoteController.createNote);
    app.patch('/api/note/:id/edit', NoteController.updateNote);
    app.delete('/api/note/:id', NoteController.deleteNote);
    app.get('/api/note/check-title/:title', NoteController.checkTitleUniqueness);

}
