const {  User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate({
            path: "Book",
            populate: "Book",
          });

        return userData;
      }

      throw new AuthenticationError("Not logged in");
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
        console.log(username, email, password, "addUser")
      const user = await User.create({username, email, password});

      const token = signToken(user);
            console.log(token, "token")
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("User not found");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Wrong password");
      }

      const token = signToken(user);
      return { token, user };
    },
    savedBooks: async (parent, { bookData }, context) => {
      if (context.user) {
      const newSavedBook = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $push: { savedBooks: bookData } },
        { new: true, runValidators: true }
      );

      return newSavedBook;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
  
  removeBook: {
    resolve: async (parent, { bookId, userId }, context) => {
      const pullBook = await User.findOneAndUpdate(
        { userId: context.user._id },
        { $pull: { savedBooks: { bookId: bookId } } },
        { new: true, runValidators: true }
      );
      return pullBook;
    },
  },
},
};

module.exports = resolvers;
