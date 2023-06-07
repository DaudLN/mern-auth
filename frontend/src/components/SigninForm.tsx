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
import userStore from '../store/userStore';
import FormContainer from './FormContainer';

const userDetailSchema = z.object({
  email: z
    .string({ required_error: 'Email can nit be empty' })
    .email({ message: 'Provide a valid email' }),
  password: z
    .string({ required_error: 'Password can not be empty' })
    .min(1, { message: 'Password can not be empty' }),
});

type UserDetails = z.infer<typeof userDetailSchema>;


const SigninForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<UserDetails>({
    resolver: zodResolver(userDetailSchema),
  });
  const navigate = useNavigate();
  const setUserInfo = userStore((s) => s.setUserInfo);
  const toast = useToast();
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
      .post<UserDetails>('/api/v1/users/signin', data)
      .then((res) => {
        setUserInfo(res.data);
        navigate('/');
      })
      .catch((err: AxiosError<{ status: string; message: string }>) =>
        showToast(err.response?.data?.message)
      );
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <FormControl isRequired mb={3}>
        <FormLabel>Email address</FormLabel>
        <Input {...register('email')} type="email" placeholder="Name" />
        {errors.email?.message && (
          <Text as="small" color="red">
            {errors.email?.message}
          </Text>
        )}
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Password</FormLabel>
        <Input
          {...register('password')}
          type="password"
          placeholder="Password"
        />
        {errors.password?.message && (
          <Text as="small" color="red">
            {errors.password?.message}
          </Text>
        )}
      </FormControl>
      <Button type="submit" mt={3} colorScheme="whatsapp" isDisabled={!isValid}>
        Signin
      </Button>
    </FormContainer>
  );
};

export default SigninForm;
