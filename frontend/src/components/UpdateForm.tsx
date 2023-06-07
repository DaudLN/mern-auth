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
import { ChangeEvent, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { z } from 'zod';
import useUserStore from '../store/userStore';
import FormContainer from './FormContainer';

const userDetailSchema = z.object({
  name: z.string({ required_error: 'Name can not be empty' }).optional(),
  email: z
    .string({ required_error: 'Email can nit be empty' })
    .email({ message: 'Provide a valid email' })
    .optional(),
  password: z
    .string({ required_error: 'Password can not be empty' })
    .min(8, { message: 'Password is atleast 8 characters long' })
    .optional(),
  passwordConfirm: z
    .string({ required_error: 'Password should be confirmed' })
    .optional(),
});

type UserDetails = z.infer<typeof userDetailSchema>;
interface UserResponseData {
  status: string;
  data: {
    _id: string;
    name: string;
    email: string;
  };
}

const UpdateForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<UserDetails>({
    resolver: zodResolver(userDetailSchema),
  });
  const toast = useToast();
  const setUserInfo = useUserStore((s) => s.setUserInfo);
  const userInfo = useUserStore((s) => s.userInfo);
  const [user, setUser] = useState<UserDetails>(userInfo);
  const showToast = (message?: string, status?: 'error' | 'success') => {
    toast({
      position: 'top-right',
      duration: 6000,
      title: message,
      colorScheme: status === 'error' ? 'red' : 'green',
      status: status,
      containerStyle: {},
      isClosable: true,
    });
  };

  const onSubmit = async (data: FieldValues) => {
    await axios
      .put<UserDetails, UserResponseData>('/api/v1/users/me', data)
      .then((res) => {
        setUserInfo(res.data);
        showToast('Profile updated successfull', 'success');
      })
      .catch((err: AxiosError<{ status: string; message: string }>) => {
        showToast(err.response?.data?.message, 'error');
      });
  };
  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <FormControl isRequired mb={4}>
        <FormLabel>Name</FormLabel>
        <Input
          id="name"
          type="text"
          placeholder="Name"
          value={user.name}
          {...register('name', {
            onChange: (e: ChangeEvent<HTMLInputElement>) =>
              setUser({ ...user, name: e.target.value }),
          })}
        />
      </FormControl>
      <FormControl isRequired mb={4}>
        <FormLabel>Email</FormLabel>
        <Input
          id="email"
          type="email"
          readOnly
          disabled
          {...register('email', {
            onChange: (e: ChangeEvent<HTMLInputElement>) =>
              setUser({ ...user, email: e.target.value }),
          })}
          placeholder="Email"
          value={user.email}
        />
        {errors.email?.message && (
          <Text as="small" color="red">
            {errors.email?.message}
          </Text>
        )}
      </FormControl>

      {/* <FormControl isRequired mb={4}>
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
      </FormControl> */}
      <Button type="submit" mt={3} colorScheme="whatsapp" isDisabled={!isValid}>
        Submit
      </Button>
    </FormContainer>
  );
};

export default UpdateForm;
