import React from 'react';
import { ChakraProvider, Box, FormControl, FormLabel, Input, Button, Heading, Link } from '@chakra-ui/react';
import { Link as RouterLink ,useNavigate} from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
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
            <Button width="full" mt={4} colorScheme="purple" type="submit" onClick={()=>{   navigate('/dashboard');}}>
              Sign In
            </Button>
          </form>
          <Box mt={2} textAlign="center">
            <Link as={RouterLink} to="/signUp" color="purple.500">
              Need an account? Sign up
            </Link>
          </Box>
        </Box>
      </Box>
    </ChakraProvider>
  );
}
