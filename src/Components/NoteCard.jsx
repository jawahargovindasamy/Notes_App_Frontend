import React from "react";
import {
  FaThumbtack,
  FaTrashAlt,
  FaEdit,
  FaArchive,
  FaUndo,
  FaTimesCircle,
} from "react-icons/fa";

const NoteCard = ({
  note,
  onTogglePin,
  onToggleArchive,
  onDelete,
  onEdit,
  onPermanentDelete,
}) => {
  return (
    <div
      className={`
        relative bg-white border rounded-xl p-5 shadow-md transition-shadow duration-200 hover:shadow-lg
        ${note.pinned ? "ring-2 ring-yellow-300 bg-yellow-50/90" : ""}
        ${note.archived ? "opacity-75 bg-gray-50 border-gray-200" : ""}
        ${note.deleted ? "opacity-60 bg-red-50 border border-red-300" : "border-gray-200"}
      `}
    >
      {/* Pinned, Archived, Deleted Badges */}
      {(note.pinned || note.archived || note.deleted) && (
        <div className="absolute right-4 top-4 flex gap-2">
          {note.pinned && (
            <span className="flex items-center gap-1 text-xs px-2 py-0.5 bg-yellow-200 text-yellow-800 rounded shadow">
              <FaThumbtack className="w-3 h-3" />
              Pinned
            </span>
          )}
          {note.archived && !note.deleted && (
            <span className="flex items-center gap-1 text-xs px-2 py-0.5 bg-purple-100 text-purple-700 rounded shadow">
              <FaArchive className="w-3 h-3" />
              Archived
            </span>
          )}
          {note.deleted && (
            <span className="flex items-center gap-1 text-xs px-2 py-0.5 bg-red-100 text-red-700 rounded shadow">
              <FaTrashAlt className="w-3 h-3" />
              Trash
            </span>
          )}
        </div>
      )}

      {/* Title */}
      <div className="mb-1">
        <h2 className="text-lg font-bold text-gray-900 break-all">
          {note.title}
        </h2>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-700 mb-4 min-h-[44px] whitespace-pre-line break-words">
        {note.description}
      </p>

      {/* Tags */}
      {note.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {note.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full shadow-sm"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100 mt-2">
        {!note.deleted ? (
          <>
            <button
              onClick={() => onEdit(note)}
              className="transition hover:scale-105 active:scale-95 duration-100 text-green-700 hover:text-white hover:bg-green-600 px-2 py-1 rounded flex items-center gap-1 text-sm font-medium"
            >
              <FaEdit className="w-4 h-4" />
              Edit
            </button>
            <button
              onClick={() => {
                if (!note.archived) onTogglePin(note._id);
              }}
              disabled={note.archived}
              className={`transition hover:scale-105 active:scale-95 duration-100 px-2 py-1 rounded flex items-center gap-1 text-sm font-medium ${
                note.archived
                  ? "text-gray-400 bg-gray-100 cursor-not-allowed"
                  : "text-yellow-700 hover:text-white hover:bg-yellow-500 cursor-pointer"
              }`}
              title={
                note.archived
                  ? "Unarchive the note to pin it"
                  : note.pinned
                  ? "Unpin this note"
                  : "Pin this note"
              }
            >
              <FaThumbtack className="w-4 h-4" />
              {note.pinned ? "Unpin" : "Pin"}
            </button>
            <button
              onClick={() => {
                if (!note.pinned) onToggleArchive(note._id);
              }}
              disabled={note.pinned}
              className={`transition hover:scale-105 active:scale-95 duration-100 px-2 py-1 rounded flex items-center gap-1 text-sm font-medium ${
                note.pinned
                  ? "text-gray-400 bg-gray-100 cursor-not-allowed"
                  : "text-purple-700 hover:text-white hover:bg-purple-500 cursor-pointer"
              }`}
              title={
                note.pinned
                  ? "Unpin the note to archive it"
                  : note.archived
                  ? "Unarchive this note"
                  : "Archive this note"
              }
            >
              <FaArchive className="w-4 h-4" />
              {note.archived ? "Unarchive" : "Archive"}
            </button>
            <button
              onClick={() => onDelete(note._id)}
              className="transition hover:scale-105 active:scale-95 duration-100 text-red-600 hover:text-white hover:bg-red-600 px-2 py-1 rounded flex items-center gap-1 text-sm font-medium"
            >
              <FaTrashAlt className="w-4 h-4" />
              Delete
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => onDelete(note._id)}
              className="transition hover:scale-105 active:scale-95 duration-100 text-green-700 hover:text-white hover:bg-green-600 px-2 py-1 rounded flex items-center gap-1 text-sm font-medium"
            >
              <FaUndo className="w-4 h-4" />
              Restore
            </button>
            <button
              onClick={() => onPermanentDelete(note._id)}
              className="transition hover:scale-105 active:scale-95 duration-100 text-red-700 hover:text-white hover:bg-red-800 px-2 py-1 rounded flex items-center gap-1 text-sm font-medium"
            >
              <FaTimesCircle className="w-4 h-4" />
              Delete Permanently
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default NoteCard;
