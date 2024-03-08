import React, { useState, useEffect } from 'react';
import { Client, Databases , ID ,Account } from "appwrite";
import { Link as RouterLink ,useNavigate} from 'react-router-dom';
import {v4 as uuidv4 } from "uuid";
import { ChakraProvider, Box, Heading, FormControl, FormLabel, Input, Button, Link, FormErrorMessage } from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';


export default function SignIn() {

  const navigate = useNavigate();
   const client = new Client();

  const account = new Account(client);

  client
  .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
  .setProject('65c4c6ac2b9a06cef41b') // Your project ID
;

const signUp = (values) => {
  const promise = account.create(uuidv4(), values.email,values.password,values.userName);

  promise.then(function (response) {
      navigate('/');
  }, function (error) {
      console.log(error); // Failure
  });
}




  return (
    // <><><div>sign-in</div><button onClick={getApidata}>Create</button></><button onClick={deleteApiData}>Delete</button><button onClick={updateApiData}>update</button></>
    <ChakraProvider>
      <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg" margin="auto" mt={20}>
        <Box textAlign="center">
          <Heading>Sign Up</Heading>
        </Box>
        <Box my={4}>
          <Formik
            initialValues={{ email: '', password: '', confirmPassword: '', userName: '' }}
            onSubmit={(values, { resetForm }) => {
              signUp(values);
              resetForm();
            }}
            validate={(values) => {
              const errors = {};
              if (values.password !== values.confirmPassword) {
                errors.confirmPassword = 'Passwords do not match';
              }
              return errors;
            }}
          >
            {({ handleSubmit, errors }) => (
              <Form onSubmit={handleSubmit}>
                <Field name="email">
                  {({ field }) => (
                    <FormControl>
                      <FormLabel>Email address</FormLabel>
                      <Input {...field} type="email" placeholder="Enter email" />
                    </FormControl>
                  )}
                </Field>
                <Field name="userName">
                  {({ field }) => (
                    <FormControl mt={4}>
                      <FormLabel>User Name</FormLabel>
                      <Input {...field} type="text" placeholder="Enter username" />
                    </FormControl>
                  )}
                </Field>
                <Field name="password">
                  {({ field }) => (
                    <FormControl mt={4} isInvalid={errors.password}>
                      <FormLabel>Password</FormLabel>
                      <Input {...field} type="password" placeholder="Enter password" />
                    </FormControl>
                  )}
                </Field>
                <Field name="confirmPassword">
                  {({ field }) => (
                    <FormControl mt={4} isInvalid={errors.confirmPassword}>
                      <FormLabel>Confirm Password</FormLabel>
                      <Input {...field} type="password" placeholder="Confirm password" />
                      <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Button width="full" mt={4} colorScheme="purple" type="submit">
                  Sign Up
                </Button>
                <Box mt={2} textAlign="center">
                  <Link href="/" color="purple.500">
                    Already a member? Login in
                  </Link>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </ChakraProvider>
  )
}
