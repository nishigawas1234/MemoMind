import React from 'react';
import { ChakraProvider, Box, Heading, FormControl, FormLabel, Input, Button, Link } from '@chakra-ui/react';
import { Formik, Form, Field } from "formik"
import { Link as RouterLink ,useNavigate} from 'react-router-dom';
import { Client, Databases , ID ,Account } from "appwrite";

export default function Login() {
  const navigate = useNavigate();

  const client = new Client();

  const account = new Account(client);

  client
  .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
  .setProject('65c4c6ac2b9a06cef41b') // Your project ID
;

  const logIn = (values) =>{
    const promise = account.createEmailSession(values.email,values.password);

    promise.then(function (response) {
        // account.createEmailSession(values.email,values.password)
        navigate('/dashboard');
    }, function (error) {
    });
  }
  return (
    <ChakraProvider>
    <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg" margin="auto" mt={20}>
      <Box textAlign="center">
        <Heading>Sign In</Heading>
      </Box>
      <Box my={4}>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={(values) => {
            logIn(values); 
          }}
        >
          <Form>
            <Field name="email">
              {({ field }) => (
                <FormControl>
                  <FormLabel>Email address</FormLabel>
                  <Input {...field} type="email" placeholder="Enter email" />
                </FormControl>
              )}
            </Field>
            <Field name="password">
              {({ field }) => (
                <FormControl mt={4}>
                  <FormLabel>Password</FormLabel>
                  <Input {...field} type="password" placeholder="Enter password" />
                </FormControl>
              )}
            </Field>
            <Button width="full" mt={4} colorScheme="purple" type="submit">
              Sign In
            </Button>
          </Form>
        </Formik>
        <Box mt={2} textAlign="center">
          <Link href="/signUp" color="purple.500">
            Need an account? Sign up
          </Link>
        </Box>
      </Box>
    </Box>
  </ChakraProvider>
  );
}
