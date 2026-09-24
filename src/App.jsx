import { useState, useEffect } from 'react'
import './App.css'
import Note from './components/Note.jsx'

function App() {
  const [newNote, setNewNote] = useState("")
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes")
    return JSON.parse(savedNotes) || []
  })
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes))
  }, [notes])

  function addNote(event) {
    event.preventDefault()
    if (newNote.trim() === "") {
    setNewNote("")
    return
  }
    setNotes(prevNotes => [...prevNotes, { 
      id: Date.now(), 
      text: newNote.trim(), 
      completed: false}])
    setNewNote("")
  }

  function deleteNote(id) {
    setNotes(prevNotes =>
      prevNotes.filter(note => note.id !== id)
    )
  }
  function toggleNoteCompletion(id) {
    setNotes(prevNotes =>
      prevNotes.map(note =>
        note.id === id ? { ...note, completed: !note.completed }
        : note
      )
    )
  }
  let filteredNotes = notes

  if (filter === "active") {
    filteredNotes = notes.filter(note => !note.completed)
  }
  if (filter === "completed") {
    filteredNotes = notes.filter(note => note.completed)
  }
  return (
    <div className="notesApp">
      <h1>My Notes</h1>
      <p>{notes.length} notes — {notes.filter(note => note.completed).length} completed </p>
        <form className="notesContainer" onSubmit={addNote}>
          <input className="noteInput" value={newNote} onChange={(event) => setNewNote(event.target.value)} type="text" placeholder="Write a new note..." />
          <button className="noteButton" type="submit">Add Note</button>
        </form>
        <div className="filterButtons">
          <button className={filter === "all" ? "filterButton active" : "filterButton"} onClick={() => setFilter("all")}>All</button>
          <button className={filter === "active" ? "filterButton active" : "filterButton"} onClick={() => setFilter("active")}>Active</button>
          <button className={filter === "completed" ? "filterButton active" : "filterButton"} onClick={() => setFilter("completed")}>Completed</button>
        </div>
        
      {filteredNotes.map(note => (
        <Note 
          key={note.id}
          note={note}
          toggleNoteCompletion={toggleNoteCompletion}
          deleteNote={deleteNote}
        />
      ))}
    </div>
  )
}

export default App
