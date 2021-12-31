///////////// FROM README ////////////////////////////
// LOGIN_USER will execute the loginUser mutation set up using Apollo Server.

// ADD_USER will execute the addUser mutation.

// SAVE_BOOK will execute the saveBook mutation.

// REMOVE_BOOK will execute the removeBook mutation.
///////////// ^^^ FROM README /////////////////////////

import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    me(email: $email, password: $password) {
      _id
      email
      password
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    me(username: $username, email: $email, password: $password) {
      _id
      username
      email
      password
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook(
    $_id: String!
    $author: String!
    $description: String!
    $title: String!
    $bookId: String!
    $image: String!
    $link: String!
  ) {
    me(
      _id: $_id
      author: $author
      description: $description
      title: $title
      bookId: $bookId
      image: $image
      link: $link
    ) {
      _id
      author
      description
      title
      bookId
      image
      link
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($_id: String!, $bookId: String!) {
    me(_id: $_id, bookId: $bookId) {
      _id
      bookId
    }
  }
`;
