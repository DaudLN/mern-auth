import { Container, Card, CardBody } from '@chakra-ui/react';
import React from 'react';
import { Form } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
  onSubmit: () => void;
}
const FormContainer = ({ children, onSubmit }: Props) => {
  return (
    <Container>
      <Card>
        <CardBody>
          <Form onSubmit={onSubmit}>{children}</Form>
        </CardBody>
      </Card>
    </Container>
  );
};

export default FormContainer;
