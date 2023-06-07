import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  useToast,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { FieldValues, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import useUserStore from '../store/userStore';
import FormContainer from './FormContainer';

const userDetailSchema = z.object({
  name: z.string({ required_error: 'Name can not be empty' }),
  email: z
    .string({ required_error: 'Email can nit be empty' })
    .email({ message: 'Provide a valid email' }),
  password: z
    .string({ required_error: 'Password can not be empty' })
    .min(8, { message: 'Password is atleast 8 characters long' }),
  passwordConfirm: z.string({ required_error: 'Password should be confirmed' }),
});

type UserDetails = z.infer<typeof userDetailSchema>;

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<UserDetails>({
    resolver: zodResolver(userDetailSchema),
  });
  const toast = useToast();
  const navigate = useNavigate();
  const setUserInfo = useUserStore((s) => s.setUserInfo);
  const showToast = (message?: string) => {
    toast({
      position: 'top-right',
      duration: 6000,
      title: message,
      colorScheme: 'red',
      status: 'error',
      containerStyle: {},
      isClosable: true,
    });
  };

  const onSubmit = async (data: FieldValues) => {
    await axios
      .post<UserDetails>('/api/v1/users/signup', data)
      .then((res) => {
        setUserInfo(res.data);
        navigate('/signin');
      })
      .catch((err: AxiosError<{ status: string; message: string }>) => {
        showToast(err.response?.data?.message);
      });
  };
  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <FormControl isRequired mb={4}>
        <FormLabel>Name</FormLabel>
        <Input id="name" type="text" placeholder="Name" {...register('name')} />
      </FormControl>
      <FormControl isRequired mb={4}>
        <FormLabel>Email</FormLabel>
        <Input
          id="email"
          type="email"
          placeholder="Email"
          {...register('email')}
        />
        {errors.email?.message && (
          <Text as="small" color="red">
            {errors.email?.message}
          </Text>
        )}
      </FormControl>

      <FormControl isRequired mb={4}>
        <FormLabel>Password</FormLabel>
        <Input
          id="password"
          type="password"
          placeholder="Password"
          {...register('password')}
        />
        {errors.password?.message && (
          <Text as="small" color="red">
            {errors.password?.message}
          </Text>
        )}
      </FormControl>
      <FormControl isRequired mb={4}>
        <FormLabel>Confirm Password</FormLabel>
        <Input
          id="passwordConfirm"
          type="password"
          placeholder="Confirm Password"
          {...register('passwordConfirm')}
        />
      </FormControl>
      <Button type="submit" mt={3} colorScheme="whatsapp" isDisabled={!isValid}>
        Submit
      </Button>
    </FormContainer>
  );
};

export default SignupForm;
