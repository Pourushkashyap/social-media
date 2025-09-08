import { Post } from "../model/Post.js";
import { asynchandler } from "../utils/Asynchandler.js";
import {Apierror} from "../utils/ApiError.js"
import {Apiresponse} from "../utils/ApiResponse.js"
import { uploadoncloudinary } from "../utils/cloudinary.js";
import mongoose from "mongoose";


const createPost = asynchandler(async (req,res) => {
  const filepath = req.file?.path;
  if (!filepath) {
    throw new Apierror(400,"Image is required");
  }

  const uploadimage = await uploadoncloudinary(filepath);
  if (!uploadimage) {
    throw new Apierror(500,"Image upload failed");
  }

  const newPost = new Post({
    userId: req.user._id,
    caption: req.body.caption,
    image: uploadimage.secure_url,
  });

  const savedPost = await newPost.save();

  res.status(201).json(
    new Apiresponse(201, savedPost, "Post created successfully")
  );
});


const getuserPosts = asynchandler(async (req,res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Apierror(400, "Invalid userId");
  }

  const posts = await Post.find({ userId: new mongoose.Types.ObjectId(userId) })
    .sort({ createdAt: -1 });

    console.log("User posts fetched:", posts);

  res.status(200).json(
    new Apiresponse(200, posts, "User posts fetched successfully")
  );
});


const likePost = asynchandler(async (req, res) => {
  const { postId } = req.params;
  const userId = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    throw new Apierror(400, "Invalid postId");
  }

  const post = await Post.findById(postId);
  if (!post) {
    throw new Apierror(404, "Post not found");
  }

  const alreadyLiked = post.likes.some(
    (id) => id.toString() === userId.toString()
  );

  if (alreadyLiked) {
    post.likes = post.likes.filter((id) => id.toString() !== userId.toString());
  } else {
    post.likes.push(userId);
  }

  await post.save();

  res.status(200).json(
    new Apiresponse(
      200,
      { likes: post.likes, likeCount: post.likes.length, liked: !alreadyLiked },
      alreadyLiked ? "Post unliked" : "Post liked"
    )
  );
});



export { createPost, getuserPosts, likePost }