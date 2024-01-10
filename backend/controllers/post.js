// controllers/post.js
import Post from '../models/post.js';

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: 'Post not found' });
  }
};

export const addPost = async (req, res) => {
  const post = req.body;

  try {
    const newPost = await Post.create(post);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    await Post.findByIdAndRemove(id);
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(404).json({ message: 'Post not found' });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const updatedPost = req.body;

  try {
    const result = await Post.findByIdAndUpdate(id, updatedPost, { new: true });
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: 'Post not found' });
  }
};
