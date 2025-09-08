// import React from "react";

// function PostModal({ post, onClose }) {
//   if (!post) return null; // Don't render if no post is selected

//   return (
//     <div
//       className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
//       onClick={onClose}
//     >
//       <div
//         className="bg-gray-900 rounded-2xl w-[90%] md:w-[70%] lg:w-[50%] max-h-[90%] overflow-hidden flex flex-col"
//         onClick={(e) => e.stopPropagation()} // prevent closing on modal click
//       >
//         {/* Header */}
//         <div className="flex justify-between items-center p-3 border-b border-gray-700">
//           <div className="font-semibold">{post.user?.username || "User"}</div>
//           <button onClick={onClose} className="text-gray-400 hover:text-white">
//             ✕
//           </button>
//         </div>

//         {/* Image */}
//         <div className="flex-1 flex justify-center items-center bg-black">
//           <img
//             src={post.image}
//             alt="post"
//             className="max-h-[500px] object-contain"
//           />
//         </div>

//         {/* Footer */}
//         <div className="p-4 space-y-2">
//           <div className="flex gap-3 items-center">
//             ❤️ {post.likes?.length || 0}
//           </div>
//           <div className="text-sm text-gray-300">{post.caption}</div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default PostModal;



import React, { useState } from "react";

function PostModal({ post, onClose }) {
  if (!post) return null;

  // Local state for likes
  const [likeCount, setLikeCount] = useState(post.likes?.length || 0);
  const [liked, setLiked] = useState(
    post.likes?.some((id) => id === post.currentUserId) // pass currentUserId later
  );

  const toggleLike = async () => {
    try {
      const res = await fetch(`/api/v1/posts/${post._id}/like`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (res.ok) {
        setLikeCount(data.data.likeCount);
        setLiked(data.data.liked);
      } else {
        console.error("Error toggling like:", data.message);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 rounded-2xl w-[90%] md:w-[70%] lg:w-[50%] max-h-[90%] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-3 border-b border-gray-700">
          <div className="font-semibold">{post.user?.username || "User"}</div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            ✕
          </button>
        </div>

        {/* Image */}
        <div className="flex-1 flex justify-center items-center bg-black">
          <img
            src={post.image}
            alt="post"
            className="max-h-[500px] object-contain"
          />
        </div>

        {/* Footer */}
        <div className="p-4 space-y-2">
          <div className="flex gap-3 items-center">
            <button onClick={toggleLike}>
              {liked ? (
                <span className="text-red-500 text-2xl">❤️</span>
              ) : (
                <span className="text-white text-2xl">🤍</span>
              )}
            </button>
            <span>{likeCount} likes</span>
          </div>
          <div className="text-sm text-gray-300">{post.caption}</div>
        </div>
      </div>
    </div>
  );
}

export default PostModal;
