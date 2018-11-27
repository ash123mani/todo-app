const fs = require("fs");

var fetchNotes = () => {
  try {
    var existingNote = fs.readFileSync("notes-data.json");
    return JSON.parse(existingNote);
  } catch (e) {
    return [];
  }
};

var saveNotes = notes => {
  fs.writeFileSync("notes-data.json", JSON.stringify(notes));
};

var addNote = (title, body) => {
  var notes = fetchNotes();
  var note = {searchedNotes
    title,
    body
  };
  var duplicateNotes = notes.filter(note => note.title === title);

  if (duplicateNotes.length === 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  }
};

var removeNote = title => {
  var notes = fetchNotes();
  var filteredNotes = notes.filter(note => note.title !== title);
  saveNotes(filteredNotes);

  return notes.length !== filteredNotes.length;
};

var getNote = title => {
  var notes = fetchNotes();
  var filteredNotes = notes.filter(note => note.title === title);
  return filteredNotes[0];
};

var searchNote = title => {
  var notes = fetchNotes();
  var filteredNotes = notes.filter(note => note.title.includes(title));
  return filteredNotes;
};

var getAll = () => {
  return fetchNotes();
};

var logNote = note => {
  console.log("--");
  console.log(`Title: ${note.title}`);
  console.log(`Body: ${note.body}`);
};

module.exports = {
  addNote,
  getAll,
  removeNote,
  getNote,
  logNote,
  searchNote
};
