///////////////////////////////// FROM README ////////////////////////////////////
//  Create an Apollo Provider to make every request work with the Apollo Server.
///////////////////////////////// FROM README ////////////////////////////////////

import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SearchBooks from "./pages/SearchBooks";
import SavedBooks from "./pages/SavedBooks";
import Navbar from "./components/Navbar";

//////////////////// APOLLO //////////////////////////////////
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});
//////////////////// APOLLO //////////////////////////////////

function App() {
  return (
    //////////////////// APOLLO //////////////////////////////////
    <ApolloProvider client={client}>
      {/* //////////////////// APOLLO ////////////////////////////////// */}
      <Router>
        <>
          <Navbar />
          <Switch>
            <Route exact path="/" component={SearchBooks} />
            <Route exact path="/saved" component={SavedBooks} />
            <Route render={() => <h1 className="display-2">Wrong page!</h1>} />
          </Switch>
        </>
      </Router>
      {/* //////////////////// APOLLO ////////////////////////////////// */}
    </ApolloProvider>
    //////////////////// APOLLO //////////////////////////////////
  );
}

export default App;
