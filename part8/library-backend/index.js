const { ApolloServer } = require("@apollo/server");
const { gql } = require("apollo-server");
const { startStandaloneServer } = require("@apollo/server/standalone");
// const { v4: uuid } = require("uuid");
const { GraphQLError } = require("graphql");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const Author = require("./models/author");
const Book = require("./models/book");
require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

const typeDefs = gql`
  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int!
  }

  input AuthorInput {
    name: String!
    born: Int
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: AuthorInput!
      genres: [String!]!
    ): Book

    addAuthor(name: String!, born: Int): Author

    editAuthor(name: String!, setBornTo: Int): Author
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => await Book.collection.countDocuments(),
    authorCount: async () => await Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.author) {
        const foundAuthor = await Author.findOne({ name: args.author });
        if (foundAuthor) {
          if (args.genre) {
            return await Book.find({
              author: foundAuthor.id,
              genres: { $in: [args.genre] },
            }).populate("author");
          }
          return Book.find({}).populate("author");
        }
        return null;
      }

      if (args.genre) {
        return Book.find({ genres: { $in: [args.genre] } }).populate("author");
      }

      return Book.find({}).populate("author");
    },
    allAuthors: async () => {
      return await Author.find({});
      // Author.map((author) => ({
      //   ...author,
      //   bookCount: Book.filter((book) => book.author === author.name).length,
      // }));
    },
  },
  Author: {
    bookCount: async (root) => {
      const foundAuthor = await Author.findOne({ name: root.name });
      const foundBooks = await Book.find({ author: foundAuthor.id });
      return foundBooks.length;
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      const book = new Book({ ...args });
      // books = books.concat(book);

      // if (!Author.find((a) => a.name === args.author)) {
      //   authors = authors.concat({ name: args.author, id: uuid() });
      // }
      return book.save();
    },
    addAuthor: async (root, args) => {
      const author = new Author({ ...args });
      return author.save();
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name });
      if (!author) {
        return null;
      }
      author.born = args.setBornTo;
      // const updateAuthor = { ...author, born: args.setBornTo };
      // authors = authors.map((a) => (a.name !== args.name ? a : updateAuthor));
      return author.save();
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
