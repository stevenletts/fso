const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user");

require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

console.log("connecting to ", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB: ", error.message);
  });

const typeDefs = `
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type User {
    username: String!
    favouriteGenre: String! 
    id: ID!
  }

  type Token {
    value: String! 
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, year: Int!): Author
    createUser(username: String!, favouriteGenre: String!): User
    login(username: String!, password: String!)
 : Token  
}`;

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      //works with genre and/or author selection
      if (args.author) {
        const selectedAuthor = await Author.findOne({ name: args.author });
        if (!selectedAuthor) return null;
        if (args.genre) {
          return await Book.find({
            author: selectedAuthor.id,
            genres: { $in: [args.genre] },
          }).populate("author");
        }
        return await Book.find({ author: selectedAuthor.id }).populate(
          "author"
        );
      } else if (args.genre) {
        return await Book.find({ genres: { $in: [args.genre] } }).populate(
          "author"
        );
      }

      return await Book.find({}).populate("author");
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Author: {
    bookCount: async (root) => {
      const authorFound = await Author.findOne({ name: root.name });
      const booksFound = await Book.find({ author: authorFound.id });
      return booksFound.length;
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("not logged in");
      }
      const foundAuthor = await Author.findOne({ name: args.author });
      if (foundAuthor) {
        const book = new Book({ ...args, author: foundAuthor });
        try {
          await book.save();
        } catch (error) {
          throw new GraphQLError("saving book failed but author found", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args,
              error,
            },
          });
        }
        return book;
      }
      try {
        const author = new Author({ name: args.author });
        await author.save();
        const newAuthor = await Author.findOne({ name: args.author });
        const book = new Book({ ...args, author: newAuthor });
        await book.save();
        return book;
      } catch (error) {
        throw new GraphQLError("saving book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args,
            error,
          },
        });
      }
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("not logged in");
      }
      const newOne = await Author.findOneAndUpdate(
        { name: args.name },
        { born: args.year },
        { returnOriginal: false }
      );
      return newOne;
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favouriteGenre: args.favouriteGenre,
      });
      return user.save().catch((error) => {
        throw new GraphQLError("creating new user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong login info", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      };
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorisaztion : null;
    
    if (auth && auth.startsWith("Bearer ")) {
      const decodedToken = jwt.verify(
        auth.substring(7),
        process.env.JWT_SECRET
      );
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
