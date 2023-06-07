import { WarningIcon } from '@chakra-ui/icons';
import { Box, Container, HStack, Heading, Text } from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <>
      <Navbar />
      <Container>
        <HStack justifyContent={'center'} alignItems={'center'}>
          <WarningIcon boxSize={10} />
          <Box>
            <Heading>Not found</Heading>
            <Text>
              {isRouteErrorResponse(error)
                ? 'Ooops this page is not found'
                : 'An unexpected error occured'}
            </Text>
          </Box>
        </HStack>
      </Container>
    </>
  );
};

export default ErrorPage;
