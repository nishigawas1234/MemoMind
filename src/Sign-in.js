import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Client, Databases , ID } from "appwrite";
import { ChakraProvider, Box, FormControl, FormLabel, Input, Button, Heading ,Link} from '@chakra-ui/react';
import { Link as RouterLink ,useNavigate} from 'react-router-dom';


export default function SignIn() {
  const navigate = useNavigate();

  const client = new Client();

  client
  .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
  .setProject('65c4c6ac2b9a06cef41b') // Your project ID
;
const databases = new Databases(client);

useEffect(() => {
  let promise = databases.listDocuments(
    "65c4c8b653802bc0e25f",
    "65c4ca569bf871e35bbb",
    
  );

  promise.then(
    function (response) {
      console.log(response.documents[0].$id, "s");
      
    },
    function (error) {
      console.log(error, "error");
    }
  );
}, []);

  const getApidata = async () => {
   console.log("iiinnnnnn---------")
    let promise = databases.createDocument(
      "65c4c8b653802bc0e25f",
      "65c4ca569bf871e35bbb",
     
       ID.unique(),
       {"Tag" : ["iii"],
       "Note_title" : "Test" , 
       "Note_detail" : "Test details"}
   
    );

    promise.then(
      function (response) {
        console.log(response.documents[0].$id, "s");
        
      },
      function (error) {
        console.log(error, "error");
      }
    );
  };

  const deleteApiData = async () => {
    console.log("iiinnnnnn---------")
     let promise = databases.deleteDocument(
       "65c4c8b653802bc0e25f",
       "65c4ca569bf871e35bbb",
      "65c4e34e891c21a0c94e"
    
     );
 
     promise.then(
       function (response) {
         console.log(response.documents[0].$id, "s");
         
       },
       function (error) {
         console.log(error, "error");
       }
     );
   };

   const updateApiData = async () => {
    console.log("iiinnnnnn---------")
     let promise = databases.updateDocument(
       "65c4c8b653802bc0e25f",
       "65c4ca569bf871e35bbb",
       "65c4e45877558ee8531a",
        {"Tag" : ["tag"],
        "Note_title" : "Test updated" , 
        "Note_detail" : "Test details"}
    
     );
 
     promise.then(
       function (response) {
         console.log(response.documents[0].$id, "s");
         
       },
       function (error) {
         console.log(error, "error");
       }
     );
   };
   
  return (
    // <><><div>sign-in</div><button onClick={getApidata}>Create</button></><button onClick={deleteApiData}>Delete</button><button onClick={updateApiData}>update</button></>
    <ChakraProvider>
    <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg" margin="auto" mt={20}>
        <Box textAlign="center">
            <Heading>Sign Up</Heading>
        </Box>
        <Box my={4}>
            <form>
                <FormControl>
                    <FormLabel>Email address</FormLabel>
                    <Input type="email" placeholder="Enter email" />
                </FormControl>
                <FormControl mt={4}>
                    <FormLabel>Password</FormLabel>
                    <Input type="password" placeholder="Enter password" />
                </FormControl>
                <FormControl mt={4}>
                    <FormLabel>Confirm Password</FormLabel>
                    <Input type="password" placeholder="Confirm password" />
                </FormControl>
                <Button width="full" mt={4} colorScheme="purple" type="submit" onClick={()=>{   navigate('/');}}>
                    Sign Up
                </Button>
                <Box mt={2} textAlign="center">
            <Link as={RouterLink} to="/" color="purple.500">
             Already a member? Login in
            </Link>
          </Box>
            </form>
        </Box>
    </Box>
</ChakraProvider>
  )
}
