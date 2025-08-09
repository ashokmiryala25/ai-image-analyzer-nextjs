const User = require('../models/User');

const userResolvers = {
  Query: {
    users: async () => {
      return await User.find();
    },
  },
  Mutation: {
    addUser: async (_, { input }) => {
      const user = new User(input);
      return await user.save();
    },
  },
};

module.exports = userResolvers;
