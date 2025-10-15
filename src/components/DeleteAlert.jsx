import React from "react";

const DeleteAlert = ({ content, onDelete, onCancel }) => {
  return (
    <div className="space-y-4">
      <p>{content}</p>
      <div className="flex justify-end gap-3">
        <button onClick={onCancel} className="px-3 py-2 rounded-md border">
          Cancel
        </button>
        <button onClick={onDelete} className="px-3 py-2 rounded-md bg-red-600 text-white">
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteAlert;
