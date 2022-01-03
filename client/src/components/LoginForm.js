///////////////////////////////// FROM README ////////////////////////////////////
// Replace the loginUser() functionality imported from the API file with
//  the LOGIN_USER mutation functionality.
///////////////////////////////// FROM README ////////////////////////////////////

// see SignupForm.js for comments
import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";

// import { loginUser } from "../utils/API";
import Auth from "../utils/auth";

//////////////// APOLLO /////////////////////////////////
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import { GET_ME } from "../utils/queries";
//////////////// APOLLO /////////////////////////////////

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  ////////////// APOLLO //////////////////////////////////
  // Set up our mutation with an option to handle errors
  const [loginUser, { error }] = useMutation(LOGIN_USER, {
    // The update method allows us to access and update the local cache
    update(cache, { data: { loginUser } }) {
      try {
        // First we retrieve existing profile data that is stored in the cache under the `QUERY_PROFILES` query
        // Could potentially not exist yet, so wrap in a try/catch
        const { me } = cache.readQuery({ query: GET_ME });

        // Then we update the cache by combining existing profile data with the newly created data returned from the mutation
        cache.writeQuery({
          query: GET_ME,
          // If we want new data to show up before or after existing data, adjust the order of this array
          data: { me: [...me, loginUser] },
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
      const { data } = loginUser({
        variables: { ...userFormData },
      });

      // const response = await loginUser(userFormData);

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
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Something went wrong with your login credentials!
        </Alert>
        <Form.Group>
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your email"
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
          disabled={!(userFormData.email && userFormData.password)}
          type="submit"
          variant="success"
        >
          Submit
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
