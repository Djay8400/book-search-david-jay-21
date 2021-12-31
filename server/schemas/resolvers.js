///////////////////////////////// FROM README ////////////////////////////////////
// Define the query and mutation functionality to work with the Mongoose models.

// Hint: Use the functionality in the user-controller.js as a guide.
///////////////////////////////// FROM README ////////////////////////////////////

const { Book, User } = require("../models");

const resolvers = {
  Query: {
    users: async () => {
      return await User.find({}).populate("books");
    },
    books: async () => {
      return await Book.find({});
    },
  },
  Mutations: {
    login: async (parent, { email, password }) => {},
    addUser: async (parent, { username, email, password }) => {
      return await User.create({ username, email, password });
    },
    saveBook: async (
      parent,
      { author, description, title, bookId, image, link }
    ) => {},
    removeBook: async (parent, {}) => {},
  },
};

module.exports = resolvers;
