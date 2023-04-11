const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const { log } = require("console");
const User = require("../models/user");
const api = supertest(app);

const startingBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];
describe("blogs functionality", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    let blogObj = new Blog(startingBlogs[0]);
    await blogObj.save();
    blogObj = new Blog(startingBlogs[1]);
    await blogObj.save();
  });

  test("blogs returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all blogs returned", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(2);
  });

  test("unique identifier", async () => {
    const blogs = await Blog.find({});
    expect(blogs[0].id).toBeDefined();
  });

  test("blog post", async () => {
    const newBlog = startingBlogs[2];
    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);
    const blogsAfter = await Blog.find({});
    expect(blogsAfter).toHaveLength(3);
    const content = blogsAfter.map((blog) => blog.title);
    expect(content).toContain("Canonical string reduction");
  });

  test("zero likes", async () => {
    const newBlog = {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      __v: 0,
    };
    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);
    const blogsAfter = await Blog.find({});
    const content = blogsAfter.map((blog) => blog.likes);
    expect(content).toContain(0);
  });

  test("delete", async () => {
    const deleted = await api.delete("/api/blogs/5a422aa71b54a676234d17f8");
    const blogsAfter = await Blog.find({});
    const content = blogsAfter.map((blog) => blog.title);
    expect(content).toHaveLength(1);
    expect(content).not.toContain("Go To Statement Considered Harmful");
  });

  test("update", async () => {
    const updater = startingBlogs[0];
    updater.likes = updater.likes + 1;
    const updated = await api
      .put("/api/blogs/5a422aa71b54a676234d17f8")
      .send(updater)
      .expect(200)
      .expect("Content-Type", /application\/json/);
    const blog = await Blog.findById({
      _id: "5a422aa71b54a676234d17f8",
    });
    expect(blog.likes).toBe(8);
  });
});

describe("users api tests", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });
    await user.save();
  });

  test("new user created", async () => {
    const usersAtStart = await User.find({});
    const userAtStartList = usersAtStart.map((u) => u.toJSON());

    const newUser = {
      username: "steven",
      name: "Steven",
      password: "password",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await User.find({});
    const usersAtEndList = usersAtEnd.map((u) => u.toJSON);

    expect(usersAtEndList).toHaveLength(userAtStartList.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test("invalid username rejected", async () => {
    const newUser = {
      username: "st",
      name: "Steven",
      password: "password",
    };

    await api.post("/api/users").send(newUser).expect(500);
  });

  test("invalid password", async () => {
    const newUser = {
      username: "steven",
      name: "Steven",
      password: "a",
    };

    await api.post("/api/users").send(newUser).expect(400);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
