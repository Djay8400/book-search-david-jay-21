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
  },
  Mutations: {
    addUser: async (parent, { username, email, password }) => {
      return await User.create({ username, email, password });
    },
    login: async (parent, { email, password }) => {
      // return await;
    },
    saveBook: async (
      parent,
      { author, description, title, bookId, image, link }
    ) => {
      // return await;
    },
    removeBook: async (parent, { bookId }) => {
      // return await;
    },
  },
};

module.exports = resolvers;
