import React, { useState } from 'react';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';

import { Button, Form, Input, Spacer } from 'tamagui';

import { ICreateAuthorInput, IUpdateAuthorInput } from '../../models/author';

interface AuthorFormProps {
  formData?: IUpdateAuthorInput;
  onSubmit: (data: ICreateAuthorInput | IUpdateAuthorInput) => void;
}

const AuthorForm = (props: AuthorFormProps) => {
  const [formData, setFormData] = useState<
    ICreateAuthorInput | IUpdateAuthorInput
  >(
    props.formData ?? {
      name: '',
    },
  );

  const handleChange = (
    name: string,
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    setFormData({
      ...formData,
      [name]: e.nativeEvent.text,
    });
  };

  const handleSubmit = () => {
    props.onSubmit(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Spacer />
      <Input
        placeholder="Enter author name"
        value={formData.name}
        onChange={(e) => handleChange('name', e)}
      />
      <Spacer />
      <Form.Trigger asChild>
        <Button>Submit</Button>
      </Form.Trigger>
    </Form>
  );
};

export default AuthorForm;
