import React from 'react';

import { Text } from 'tamagui';

import { useMutation } from '@tanstack/react-query';

import BooksForm from '../../../components/forms/book';

import { ICreateBookInput, IUpdateBookInput } from '../../../models/book';
import { createBook } from '../../../services/book-service';

export default () => {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createBook,
  });

  if (isPending) {
    return <Text>Loading...</Text>;
  }

  const handleSubmit = (data: ICreateBookInput | IUpdateBookInput) => {
    mutate(data as ICreateBookInput);
  };

  return (
    <>
      <Text>Create Book</Text>
      <BooksForm onSubmit={handleSubmit} />
    </>
  );
};
