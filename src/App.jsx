import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import NoteForm from "./Pages/NoteForm";
import ProtectedRoute from "./components/ProtectedRoute"; // import it

const App = () => {
  const initialUserdata = {
    title: "",
    description: "",
    pinned: false,
    archived: false,
    deleted: false,
    tags: [],
  };

  const [notes, setNotes] = useState([]);
  const [userdata, setUserdata] = useState(initialUserdata);
  const [searchInput, setSearchInput] = useState("");

  const addNote = (noteData) => {
    if (!noteData.title.trim() && !noteData.description.trim()) {
      alert("Please enter a title or description.");
      return;
    }
    const newNote = { ...noteData, id: Date.now() };
    setNotes((prev) => [...prev, newNote]);
  };

  const editNote = (updatedNote) => {
    setNotes((prev) =>
      prev.map((note) => (note._id === updatedNote._id ? updatedNote : note))
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                notes={notes}
                setNotes={setNotes}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <NoteForm
                userdata={userdata}
                setUserdata={setUserdata}
                addNote={addNote}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit/:_id"
          element={
            <ProtectedRoute>
              <NoteForm
                userdata={userdata}
                setUserdata={setUserdata}
                editNote={editNote}
                notes={notes}
              />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
