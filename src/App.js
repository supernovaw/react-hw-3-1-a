import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { repairNotesCreators } from "./state/actionCreators";
import './App.css';

// repair note id 0 stands for nonexistent (when received, create instead of updating)

const RepairNoteForm = ({ note, handleSave, handleCancel }) => {
  const refType = useRef(null);
  const refCost = useRef(null);
  const fillFields = () => {
    const n = note ? note : { type: "", cost: "" };
    refType.current.value = n.type;
    refCost.current.value = n.cost;
  };
  const getNote = () => {
    const type = refType.current.value;
    const cost = refCost.current.value;
    return { id: note ? note.id : 0, type, cost };
  };
  const onSave = () => {
    const savedNote = getNote();
    if (savedNote.type.length === 0 || savedNote.cost.length === 0) {
      alert("Please fill out both type and cost");
      return;
    }
    handleSave(savedNote);
    if (!note) fillFields(); // empty input fields
  };
  useEffect(fillFields, [note?.id]);

  return (
    <form className="RepairNoteForm" onSubmit={e => e.preventDefault()}>
      <input className="type-input" ref={refType} placeholder="Type" />
      <input className="cost-input" ref={refCost} placeholder="Cost" />
      <button onClick={onSave}>Save</button>
      <button onClick={handleCancel}>Cancel</button>
    </form>
  );
};

const RepairNotesList = ({ notes, handleEdit, handleRemove, highlightId }) => (
  <ul className="RepairNotesList">
    {notes.map(n => <li key={n.id} className={highlightId === n.id ? "highlight" : ""}>
      {n.cost + " for " + n.type}
      <button onClick={e => handleEdit(n.id)}>Edit</button>
      <button onClick={e => handleRemove(n.id)}>Remove</button>
    </li>)}
  </ul>
);

export default function App() {
  const repairNotes = useSelector(s => s.repairNotes);
  const { removeNote, saveNote } = bindActionCreators(repairNotesCreators, useDispatch());

  const [editedNoteId, setEditedNoteId] = useState(0);
  const editedNote = repairNotes.find(n => n.id === editedNoteId);

  const handleSave = n => { saveNote(n); setEditedNoteId(0) };
  const handleCancel = () => setEditedNoteId(0);

  const handleEdit = setEditedNoteId;
  const handleRemove = removeNote;

  return (
    <div className="App">
      <RepairNoteForm {...{ note: editedNote, handleSave, handleCancel }} />
      <RepairNotesList {...{ notes: repairNotes, handleRemove, handleEdit, highlightId: editedNoteId }} />
    </div>
  );
};
