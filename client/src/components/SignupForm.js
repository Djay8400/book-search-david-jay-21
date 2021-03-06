///////////////////////////////// FROM README ////////////////////////////////////
// Replace the createUser() functionality imported from the API file with
//  the ADD_USER mutation functionality.
///////////////////////////////// FROM README ////////////////////////////////////

import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";

// import { createUser } from "../utils/API";
import Auth from "../utils/auth";

//////////////// APOLLO /////////////////////////////////
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import { GET_ME } from "../utils/queries";
//////////////// APOLLO /////////////////////////////////

const SignupForm = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  ////////////// APOLLO //////////////////////////////////
  // Set up our mutation with an option to handle errors
  const [addUser, { error }] = useMutation(ADD_USER, {
    // The update method allows us to access and update the local cache
    update(cache, { data: { addUser } }) {
      try {
        // First we retrieve existing profile data that is stored in the cache under the `QUERY_PROFILES` query
        // Could potentially not exist yet, so wrap in a try/catch
        const { me } = cache.readQuery({ query: GET_ME });

        // Then we update the cache by combining existing profile data with the newly created data returned from the mutation
        cache.writeQuery({
          query: GET_ME,
          // If we want new data to show up before or after existing data, adjust the order of this array
          data: { me: [...me, addUser] },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });
  ////////////// APOLLO //////////////////////////////////

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      ////////////// APOLLO //////////////////////////////////
      const { data } = addUser({
        variables: { ...userFormData },
      });

      // const response = await createUser(userFormData);

      // if (!response.ok) {
      //   throw new Error("something went wrong!");
      // }

      ////////////// APOLLO //////////////////////////////////

      const { token, user } = await data.json();
      console.log(user);
      Auth.login(token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <>
      {/* This is needed for the validation functionality above */}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* show alert if server response is bad */}
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Something went wrong with your signup!
        </Alert>

        <Form.Group>
          <Form.Label htmlFor="username">Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your username"
            name="username"
            onChange={handleInputChange}
            value={userFormData.username}
            required
          />
          <Form.Control.Feedback type="invalid">
            Username is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Your email address"
            name="email"
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type="invalid">
            Email is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Your password"
            name="password"
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type="invalid">
            Password is required!
          </Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={
            !(
              userFormData.username &&
              userFormData.email &&
              userFormData.password
            )
          }
          type="submit"
          variant="success"
        >
          Submit
        </Button>
      </Form>
    </>
  );
};

export default SignupForm;
