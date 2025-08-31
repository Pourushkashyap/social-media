import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import profile from "../asset/profile.jpg";

function SearchMessage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
   

    const fetchResults = async () => {
      
      if (!query.trim()) {
  try {
    const res = await fetch(`/api/v1/messages/conversations`, {
      method: "GET",
      credentials: "include"   // ✅ fix here
    })
    if (!res.ok) return console.log("failed to fetch conversation");
    const data = await res.json();
    setResults(data.data);
  }
  catch (err) {
    console.log("Error fetching conversations: ", err);
  }
  return;
}


      try {
        const res = await fetch(`/api/v1/users/search?query=${query}`, {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) return console.log("Failed to fetch results");
        const data = await res.json();
        setResults(data.data);
      } catch (err) {
        console.log("Error fetching search results: ", err);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="w-full">
      <input
        type="text"
        placeholder="Search user to message"
        className="w-full p-2 rounded bg-gray-900 text-white border border-gray-700 focus:outline-none mb-4"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="space-y-2">
        {results.map((u) => (
          <div
            key={u._id}
            onClick={() => navigate(`/front/message/${u._id}`, { state: { user: u } })}
            className="flex items-center p-2 rounded hover:bg-gray-800 cursor-pointer"
          >
            <img
              src={u.avatar || profile}
              className="h-10 w-10 rounded-full mr-3"
              alt={u.username}
            />
            <div className="flex-1">
              <div className="font-semibold">{u.username}</div>
              <div className="text-sm text-gray-400">{u.name}</div>
            </div>
            <div className="text-xs text-gray-500">{u._id === "1" ? "2h" : "6h"}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchMessage;