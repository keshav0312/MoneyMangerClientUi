import React, { useState, useRef, useEffect } from "react";
import { Trash2, Upload, User } from "lucide-react";

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (image) {
      setPreview(URL.createObjectURL(image));
    } else {
      setPreview(null);
    }
    return () => {
      if (preview) URL.revokeObjectURL(preview); // Clean up memory
    };
  }, [image]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  const handleRemoveImage = () => {
    setImage(null);
    inputRef.current.value = null;
  };

  const onChooseImage = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex justify-center mb-6">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {!preview ? (
        <div className="w-28 h-28 flex items-center justify-center bg-purple-100 rounded-full relative cursor-pointer hover:scale-105 transition-transform" onClick={onChooseImage}>
          <User className="text-purple-500" size={50} />
          <div className="absolute bottom-0 right-0 w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-md hover:bg-indigo-700 transition-colors">
            <Upload size={18} />
          </div>
        </div>
      ) : (
        <div className="relative w-28 h-28">
          <img
            src={preview}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border-2 border-purple-400"
          />
          <button
            onClick={handleRemoveImage}
            className="absolute bottom-0 right-0 w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white shadow-md hover:bg-red-600 transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
