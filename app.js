const fs = require("fs");
const yargs = require("yargs");

const notes = require("./notes.js");

const titleOptions = {
  describe: "Title of note",
  demand: true,
  alias: "t"
};

const searchTitleOptions = {
  describe: "Expected title for note to search",
  demand: true,
  alias: "s"
};

const bodyOptions = {
  describe: "Add the body of note",
  demand: true,
  alias: "b"
};

var argv = yargs
  .command("add", "Add a note", {
    title: titleOptions,
    body: bodyOptions
  })
  .command("list", "Show all the notes")
  .command("read", "Read a note", {
    title: titleOptions
  })
  .command("remove", "Remove a note", {
    title: titleOptions
  })
  .command("search", "Search for notes", {
    title: searchTitleOptions
  })
  .help().argv;

console.log("command is", argv);

var command = argv._[0];

if (command === "list") {
  console.log("\n Priniting  note(s)");
  var fetchedNotes = notes.getAll();
  fetchedNotes.forEach(note => {
    notes.logNote(note);
  });
} else if (command === "add") {
  var note = notes.addNote(argv.title, argv.body);
  if (note) {
    console.log("Note successfully created");
    notes.logNote(note);
  } else {
    console.log("\n Note title already exist");
  }
} else if (command === "remove") {
  var isNotesRemoved = notes.removeNote(argv.title);
  var message = isNotesRemoved ? "Note removed" : "Note not found";
  console.log(message);
} else if (command === "read") {
  var note = notes.getNote(argv.title);
  if (note) {
    console.log("Note found");
    notes.logNote(note);
  } else {
    console.log("Note not found");
  }
} else if (command === "search") {
  var searchedNotes = notes.searchNote(argv.title);
  if (searchedNotes.length) {
    var note = searchedNotes.forEach(note => notes.logNote(note));
  } else {
    console.log("No note found with given string");
  }
} else {
  console.log("Command not recognized");
}
