import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaTimes,
  FaPlus,
  FaThumbtack,
  FaRegTrashAlt,
} from "react-icons/fa";
import { FiArchive } from "react-icons/fi";
import NoteCard from "../Components/NoteCard";

const Home = ({
  notes,
  setNotes,
  searchInput,
  setSearchInput
}) => {
  const [ispinned, setIsPinned] = useState(false);
  const [isArchived, setIsArchived] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const url = "https://notes-app-backend-tnt0.onrender.com";
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleCreateNote = () => {
    navigate("/create");
  };

  const handleEditNote = (note) => {
    navigate(`/edit/${note._id}`);
  };

  const clearFilters = () => {
    setIsPinned(false);
    setIsArchived(false);
    setIsDeleted(false);
  };

  const filteredNotes = notes
    .filter((note) => {
      if (isDeleted) return note.deleted;
      if (ispinned) return note.pinned && !note.deleted;
      if (isArchived) return note.archived && !note.deleted;
      return !note.deleted && !note.archived;
    })
    .filter((note) => {
      const query = searchInput.toLowerCase();
      return (
        note.title.toLowerCase().includes(query) ||
        note.description.toLowerCase().includes(query) ||
        (note.tags &&
          note.tags.some((tag) => tag.toLowerCase().includes(query)))
      );
    });

  const handleTogglePin = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${url}/api/notes/toggle/${id}`,
        { action: "pinned" },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchData();
    } catch (error) {
      console.error("Error toggling pinned:", error);
    }
  };

  const handleToggleArchive = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${url}/api/notes/toggle/${id}`,
        { action: "archived" },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchData();
    } catch (error) {
      console.error("Error toggling archived:", error);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${url}/api/notes/toggle/${id}`,
        { action: "deleted" },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchData();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const handlePermanentDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${url}/api/notes/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData();
    } catch (error) {
      console.error("Error permanently deleting note:", error);
    }
  };

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found");
      }
      const response = await axios.get(`${url}/api/notes/get`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotes(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to fetch data. Please try again later.");
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  const handleAuthButton = () => {
    if (token) {
      localStorage.removeItem("token");
      navigate("/login");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 via-white to-purple-50 text-gray-800">
      {/* Header */}
      <header className="sticky top-0 z-20 w-full bg-white/90 shadow">
        <div className="container max-w-4xl mx-auto flex justify-between items-center py-4 px-4">
          <h1
            className="text-2xl font-bold text-indigo-800 tracking-tight cursor-pointer hover:text-indigo-600 transition"
            onClick={() => navigate("/")}
          >
            📝 Notes Keeper
          </h1>
          <button
            onClick={handleAuthButton}
            className={`px-6 py-2 rounded-md font-medium transition shadow-sm ${
              token
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {token ? "Logout" : "Login"}
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="container mx-auto max-w-4xl px-4 py-10">
        <div className="mb-10">
          <h2 className="text-3xl font-extrabold mb-2 text-gray-900 drop-shadow">
            My Notes
          </h2>
          <p className="text-gray-500">Organize your thoughts and ideas.</p>
        </div>

        {/* Search & Create */}
        <div className="flex flex-col md:flex-row items-stretch gap-3 mb-8">
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-300 w-4 h-4" />
            <input
              type="text"
              placeholder="Search notes..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white text-sm transition"
            />
            {searchInput && (
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-500 cursor-pointer"
                onClick={() => setSearchInput("")}
              >
                <FaTimes className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            onClick={handleCreateNote}
            className="flex items-center justify-center gap-2 px-5 py-2 bg-gradient-to-br from-indigo-500 to-blue-500 text-white rounded-lg hover:from-indigo-600 hover:to-blue-700 transition shadow text-sm font-medium"
          >
            <FaPlus className="w-4 h-4" />
            Create Note
          </button>
        </div>

        {/* Filters */}
        <ul className="flex flex-wrap gap-3 text-gray-800 mb-8">
          <li>
            <button
              className={`flex items-center gap-2 px-3 py-1 rounded-full border transition text-sm font-medium ${
                ispinned ? "border-blue-300 bg-blue-100 text-blue-800" : "border-transparent hover:bg-blue-50"
              }`}
              onClick={() => {
                setIsPinned(!ispinned);
                setIsArchived(false);
                setIsDeleted(false);
              }}
            >
              <FaThumbtack className="w-4 h-4" />
              Pinned (
              {notes.filter((note) => note.pinned && !note.deleted).length})
            </button>
          </li>
          <li>
            <button
              className={`flex items-center gap-2 px-3 py-1 rounded-full border transition text-sm font-medium ${
                isArchived ? "border-purple-300 bg-purple-100 text-purple-800" : "border-transparent hover:bg-purple-50"
              }`}
              onClick={() => {
                setIsPinned(false);
                setIsArchived(!isArchived);
                setIsDeleted(false);
              }}
            >
              <FiArchive className="w-4 h-4" />
              Archived (
              {notes.filter((note) => note.archived && !note.deleted).length})
            </button>
          </li>
          <li>
            <button
              className={`flex items-center gap-2 px-3 py-1 rounded-full border transition text-sm font-medium ${
                isDeleted ? "border-red-300 bg-red-100 text-red-700" : "border-transparent hover:bg-red-50"
              }`}
              onClick={() => {
                setIsPinned(false);
                setIsArchived(false);
                setIsDeleted(!isDeleted);
              }}
            >
              <FaRegTrashAlt className="w-4 h-4" />
              Trash ({notes.filter((note) => note.deleted).length})
            </button>
          </li>

          {(ispinned || isArchived || isDeleted) && (
            <li>
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 px-3 py-1 rounded-full border border-gray-200 bg-white hover:bg-gray-50 transition text-sm font-semibold text-gray-600"
              >
                Clear
              </button>
            </li>
          )}
        </ul>

        {/* Notes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {filteredNotes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              onTogglePin={handleTogglePin}
              onToggleArchive={handleToggleArchive}
              onDelete={handleDeleteNote}
              onEdit={handleEditNote}
              onPermanentDelete={handlePermanentDelete}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredNotes.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg animate-pulse">
              {searchInput
                ? "No notes found matching your search."
                : isDeleted
                ? "No deleted notes."
                : ispinned
                ? "No pinned notes."
                : isArchived
                ? "No archived notes."
                : "No notes yet. Create your first note!"}
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
