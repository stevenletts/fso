const blogRouter = require("express").Router();
const blog = require("../models/blog");
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const getTokenFromRequest = (request) => {
  const auth = request.get("authorization");

  if (auth && auth.startsWith("bearer ")) {
    return auth.replace("bearer ", "");
  }
  return null;
};

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
  const body = request.body;

  const decodedToken = jwt.verify(
    getTokenFromRequest(request),
    process.env.SECRET
  );

  if (!decodedToken.id) {
    return response.status(401).json({ error: "token error" });
  }

  const user = await User.findById(decodedToken.id);

  if (!body.likes) {
    body.likes = 0;
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id,
  });

  let savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  savedBlog = await Blog.findById(savedBlog._id).populate("user");

  response.status(201).json(savedBlog);
});

blogRouter.delete("/:id", async (request, response) => {
  const deleted = await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

blogRouter.put("/:id", async (request, response) => {
  const body = request.body;
  const updated = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, updated, {
    new: true,
  });
  response.status(200);
  response.json(updatedBlog);
});

module.exports = blogRouter;
