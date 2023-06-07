import {
  Box,
  Button,
  Center,
  Container,
  HStack,
  Heading,
  Text,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Container as="main" px={20} py={6} bg={'gray.100'} borderRadius={5}>
      <Box my={3}>
        <Center>
          <Heading textAlign={'center'}>
            Mongo Express React Node (MERN) Auth
          </Heading>
        </Center>
        <Box>
          <Text textAlign={'center'}>
            React Application that uses Mongo, express and Node js as the
            Backend technologies to handle user requests.
          </Text>
          <Text textAlign={'center'}>
            This min application register user, signin user and signout user. It
            uses Zustand as a frontend state management Library
          </Text>
          <Center mt={3}>
            <HStack spacing={4}>
              <Link to={'/signin'}>
                <Button variant={'solid'} colorScheme="blue">
                  Signin
                </Button>
              </Link>

              <Link to={'/signup'}>
                <Button variant={'solid'} colorScheme="teal">
                  Signup
                </Button>
              </Link>
            </HStack>
          </Center>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
