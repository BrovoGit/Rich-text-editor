// models/post.js
import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  // Add other fields as needed
});

const Post = mongoose.model('Post', postSchema);

export default Post;
