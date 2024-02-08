// Signin.js
import React from 'react';
import { ChakraProvider, Box, FormControl, FormLabel, Input, Button, Heading } from '@chakra-ui/react';

function Signin() {
    return (
        <ChakraProvider>
            <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg" margin="auto" mt={20}>
                <Box textAlign="center">
                    <Heading>Sign In</Heading>
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
                        <Button width="full" mt={4} colorScheme="blue" type="submit" >
                            Sign In
                        </Button>
                    </form>
                </Box>
            </Box>
        </ChakraProvider>
    );
}

export default Signin;
