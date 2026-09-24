function Note({ note, toggleNoteCompletion, deleteNote }) {
  return (
    <div className={note.completed ? "noteCard completed" : "noteCard"}>
        <p>{note.text}</p>
        <div className="noteButtons">
            <button className="doneButton" onClick={() => toggleNoteCompletion(note.id)}>
                {note.completed ? 'Undo' : 'Done'}
            </button>
            <button className="noteDeleteButton" onClick={() => deleteNote(note.id)}>Delete</button>
        </div>
    </div>
  )
}

export default Note