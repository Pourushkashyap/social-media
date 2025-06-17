import React, { useState } from "react";

 function Userinfo() {
  const [editing, setEditing] = useState(false);
  const [bio, setBio] = useState("Simar\n#navodayan 😌\nI...📚 Student...🧑‍🏫\n😘ਮੌਲਾ 🤟\nਮਨ ...👇 ਮੌਤ...☝");

  return (
    <div className="bg-black text-white min-h-screen flex justify-center ">
      <div className="max-w-3xl w-full px-6 py-8">
        <div className="flex items-start gap-6">
          {/* Profile Picture */}
          <div className="shrink-0 relative">
            <img
              src="" // Replace with your image path
              alt="Profile"
              className="w-36 h-36 rounded-full border-4 border-white object-cover"
            />
          </div>

          {/* User Info */}
          <div className="flex-1">
            <div className="flex items-center gap-4 flex-wrap">
              <h2 className="text-2xl font-semibold">simar.__x</h2>
              <button
                onClick={() => setEditing(!editing)}
                className="bg-gray-800 hover:bg-gray-700 text-sm px-4 py-1 rounded"
              >
                {editing ? "Save" : "Edit profile"}
              </button>
              <button className="bg-gray-800 hover:bg-gray-700 px-4 py-1 rounded text-sm">
                View archive
              </button>
              <span className="text-2xl">⚙️</span>
            </div>

            <div className="mt-3 flex gap-6 text-sm">
              <span><strong>5</strong> posts</span>
              <span><strong>565</strong> followers</span>
              <span><strong>378</strong> following</span>
            </div>

            <div className="mt-4">
              <p className="font-semibold">Simarjit Singh</p>
              {editing ? (
                <textarea
                  className="w-full mt-2 p-2 rounded text-black"
                  rows={4}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              ) : (
                <pre className="whitespace-pre-wrap text-sm mt-1">{bio}</pre>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Userinfo
