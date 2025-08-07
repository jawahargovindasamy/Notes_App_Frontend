import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const NoteForm = ({ userdata, setUserdata, addNote, editNote, notes }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const navigate = useNavigate();
  const { _id } = useParams();

  const url = "https://notes-app-backend-tnt0.onrender.com";

  useEffect(() => {
    if (_id) {
      const noteToEdit = notes.find((n) => n._id === _id);
      if (noteToEdit) {
        setUserdata(noteToEdit);
        setTagInput(noteToEdit.tags.join(", "));
        setIsEditing(true);
      }
    } else {
      setIsEditing(false);
      setUserdata({
        title: "",
        description: "",
        pinned: false,
        archived: false,
        deleted: false,
        tags: [],
      });
      setTagInput("");
    }
  }, [_id, notes, setUserdata]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserdata((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userdata.title.trim() && !userdata.description.trim()) {
      alert("Title or description is required.");
      return;
    }

    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const tagsArray = tagInput
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag);

    const notePayload = { ...userdata, tags: tagsArray };

    try {
      if (isEditing) {
        const res = await axios.put(`${url}/api/notes/edit/${_id}`, notePayload, config);
        editNote(res.data.data);
      } else {
        const res = await axios.post(`${url}/api/notes/create`, notePayload, config);
        addNote(res.data.Note);
      }

      setUserdata({
        title: "",
        description: "",
        pinned: false,
        archived: false,
        deleted: false,
        tags: [],
      });
      setTagInput("");
      navigate("/");
    } catch (err) {
      console.error("Error saving note:", err);
      alert("Failed to save note.");
    }
  };

  const handleCancel = () => {
    setUserdata({
      title: "",
      description: "",
      pinned: false,
      archived: false,
      deleted: false,
      tags: [],
    });
    setTagInput("");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200">
        <div className="p-8 sm:p-10 lg:p-12 space-y-8">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-gradient bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              {isEditing ? "Edit Note" : "Create Note"}
            </h2>
            <p className="text-gray-600 text-lg">
              {isEditing ? "Update your note details" : "Create a new note to save your thoughts"}
            </p>
          </div>

          {/* Form Container */}
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 sm:p-8 space-y-8 transition-transform hover:-translate-y-1 duration-300">
            {/* Title */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-semibold text-gray-700">Note Title</label>
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={userdata.title}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200 placeholder-gray-400 hover:border-gray-400"
              />
            </div>

            {/* Description */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-semibold text-gray-700">Description</label>
              <textarea
                name="description"
                placeholder="Description"
                value={userdata.description}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200 resize-none placeholder-gray-400 hover:border-gray-400"
              ></textarea>
            </div>

            {/* Tags */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-semibold text-gray-700">Tags</label>
              <input
                type="text"
                placeholder="Tags (comma-separated)"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200 placeholder-gray-400 hover:border-gray-400"
              />
              {tagInput && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {tagInput.split(",").map((tag, index) =>
                    tag.trim() ? (
                      <span key={index} className="px-3 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-full text-sm font-medium border border-blue-200 shadow-sm hover:scale-105 transition-transform">
                        {tag.trim()}
                      </span>
                    ) : null
                  )}
                </div>
              )}
            </div>

            {/* Checkboxes */}
            <div className="flex flex-col sm:flex-row items-center gap-4 bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded-xl shadow-inner">
              {/* Pinned */}
              <label className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 p-2 rounded transition">
                <input
                  type="checkbox"
                  checked={userdata.pinned}
                  onChange={(e) => setUserdata((prev) => ({ ...prev, pinned: e.target.checked }))}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                />
                <span className="font-medium text-gray-700">📌 Pinned</span>
              </label>
              {/* Archived */}
              <label className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 p-2 rounded transition">
                <input
                  type="checkbox"
                  checked={userdata.archived}
                  onChange={(e) => setUserdata((prev) => ({ ...prev, archived: e.target.checked }))}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                />
                <span className="font-medium text-gray-700">📁 Archived</span>
              </label>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-3 rounded-xl font-semibold border border-gray-300 bg-gray-100 hover:bg-gray-200 text-gray-700 shadow-sm transition hover:scale-105"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:shadow-xl hover:scale-105 transition"
              >
                {isEditing ? "Update Note" : "Create Note"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NoteForm;
