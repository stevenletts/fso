const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { GraphQLError } = require("graphql");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const Book = require("./models/book");
const Author = require("./models/author");

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
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      //   if (args.author) {
      //     if (args.genre) {
      //       return books.filter(
      //         (book) =>
      //           book.author === args.author && book.genres.includes(args.genre)
      //       );
      //     } else return books.filter((book) => book.author === args.author);
      //   } else if (args.genre) {
      //     return books.filter((book) => book.genres.includes(args.genre));
      //   } else return books;
      return Book.find({});
    },
    allAuthors: async () => Author.find({}),
  },
  Author: {
    bookCount: (root) => {
      const bookFound = books.filter((book) => book.author === root.name);
      return bookFound.length;
    },
  },
  Mutation: {
    addBook: async (root, args) => {
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
    editAuthor: (root, args) => {
      authors = authors.map((author) =>
        author.name === args.name ? { ...author, born: args.year } : author
      );
      return authors.find((author) => author.name === args.name);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
