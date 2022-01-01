///////////////////////////////// FROM README ////////////////////////////////////
// Implement the Apollo Server and apply it to the Express server as middleware.

// Important: Apollo Server recently migrated to Apollo Server 3. This major-version
//  release impacts how Apollo Server interacts in an Express environment. To implement
//   Apollo Server 2 as demonstrated in the activities, you MUST use the following
//    script npm install apollo-server-express@2.15.0 to install Apollo Server 2.
//     Alternately, to migrate to the latest version of Apollo Server, please refer
//      to the Apollo Server Docs on Migrating to Apollo Server 3 and Apollo Server
//       Docs on Implementing Apollo Server Express with v3. Note that if you are using
//        Apollo Server 3 you are required use await server.start() before calling
//         server.applyMiddleware.
///////////////////////////////// FROM README ////////////////////////////////////

const express = require("express");
const path = require("path");
const db = require("./config/connection");

//////////////////////// RESTful ///////////////
const routes = require("./routes");
//////////////////////// RESTful ///////////////

// Import the ApolloServer class
const { ApolloServer } = require("apollo-server-express");

// Import the two parts of a GraphQL schema
const { typeDefs, resolvers } = require("./schemas");

const app = express();
const PORT = process.env.PORT || 3001;

// Create a new instance of an Apollo server with the GraphQL schema
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Update Express.js to use Apollo server features
server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//////////////////////// Heroku ///////////////
// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}
//////////////////////// RESTful ///////////////
app.use(routes);
/////////////////////// RESTful ///////////////////

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`🌍 Now listening on localhost:${PORT}`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
