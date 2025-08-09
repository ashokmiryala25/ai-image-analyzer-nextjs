const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');

const connectDB = require('./db');
const userTypeDefs = require('./schema/userSchema');       // Adjust your schema import paths
const userResolvers = require('./resolvers/userResolver'); // Adjust your resolvers import paths

async function startServer() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  // Connect to MongoDB
  connectDB();

  // Create Apollo Server instance
  const server = new ApolloServer({
    typeDefs: userTypeDefs,
    resolvers: userResolvers,
  });

  await server.start();

  // Apply Apollo middleware to Express app
  server.applyMiddleware({ app, path: '/graphql' });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`GraphQL endpoint available at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer();
