import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, HStack, Heading, Spacer } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import useUserStore from '../store/userStore';
const Navbar = () => {
  const setUserInfo = useUserStore((s) => s.setUserInfo);
  const userInfo = useUserStore((s) => s.userInfo);

  return (
    <Flex as="nav" p={4} background={'gray.600'} color={'white'} mb={9}>
      <HStack>
        <Box>
          <Link to="/">
            <Heading as="h1" textTransform={'uppercase'} fontSize={16}>
              Mern Auth
            </Heading>
          </Link>
        </Box>
      </HStack>

      <Spacer />
      <HStack>
        {userInfo._id ? (
          <Link to="/profile">
            {' '}
            <Button aria-label={'Login'} variant={'ghost'} colorScheme="orange">
              Hello {userInfo.name}
            </Button>
          </Link>
        ) : (
          <Link to="/signin">
            <Button
              aria-label={'Login'}
              variant={'ghost'}
              colorScheme="orange"
              leftIcon={<ArrowRightIcon />}
            >
              Signin
            </Button>
          </Link>
        )}

        {userInfo._id ? (
          <Link to="/signin">
            <Button
              aria-label={'Login'}
              variant={'ghost'}
              colorScheme="orange"
              leftIcon={<ArrowLeftIcon />}
              onClick={() => setUserInfo({})}
            >
              Signout
            </Button>
          </Link>
        ) : (
          <Link to="/signup">
            <Button
              aria-label={'Login'}
              variant={'ghost'}
              colorScheme="orange"
              leftIcon={<ArrowLeftIcon />}
              onClick={() => setUserInfo({})}
            >
              Signup
            </Button>
          </Link>
        )}
      </HStack>
    </Flex>
  );
};

export default Navbar;
