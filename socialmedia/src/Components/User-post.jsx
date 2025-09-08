import React, { useRef, useState } from "react";
import axios from "axios";

function UserPost({ onClose }) {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [step, setStep] = useState(1);

  // jab file select kare
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setPreview(url);
      setFile(selectedFile);
      setStep(2); // move to caption step
    }
  };

  // API call to create post
  const handleShare = async () => {
  if (!file) return;

  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("caption", caption);

    const res = await fetch("/api/v1/posts", {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    const data = await res.json(); // ✅ yaha await karo
    console.log("Post created:", data);

    if (res.ok) {
      onClose();
    } else {
      console.error("Post creation failed:", data);
    }
  } catch (err) {
    console.error("Error creating post:", err);
  }
};


  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-[#121212] rounded-xl w-[500px] h-[500px] flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-white bg-black py-1 w-full flex items-center justify-center font-semibold text-lg mb-4">
          {step === 1 ? "Create new post" : "Add caption"}
        </h2>

        <div className="flex-1 flex flex-col items-center justify-center text-gray-300 px-4">
          {step === 1 && (
            <>
              <svg
                aria-label="Icon to represent media such as images or videos"
                className="w-20 h-20 mb-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M21 19V5c0-1.1-.9-2-2-2H5C3.9 3 3 3.9 3 5v14c0 
                1.1.9 2 2 2h14c1.1 0 2-.9 
                2-2zM8.5 13.5l2.5 3.01L14.5 
                12l4.5 6H5l3.5-4.5z"></path>
              </svg>
              <p className="mb-3">Drag photos and videos here</p>
              <button
                onClick={() => fileInputRef.current.click()}
                className="bg-blue-500 px-4 py-2 text-white rounded-md text-sm font-semibold hover:bg-blue-600"
              >
                Select from computer
              </button>
              <input
                type="file"
                accept="image/*,video/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
            </>
          )}

          {step === 2 && preview && (
            <div className="flex flex-col items-center w-full">
              {file.type.startsWith("video/") ? (
                <video src={preview} controls className="max-h-56 rounded-lg mb-4" />
              ) : (
                <img src={preview} alt="preview" className="max-h-56 rounded-lg mb-4" />
              )}
              <textarea
                placeholder="Write a caption..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full p-2 rounded-md bg-gray-800 text-white resize-none mb-4"
              />
              <button
                onClick={handleShare}
                className="bg-blue-500 px-4 py-2 text-white rounded-md text-sm font-semibold hover:bg-blue-600"
              >
                Share
              </button>
            </div>
          )}
        </div>

        {/* close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default UserPost;
