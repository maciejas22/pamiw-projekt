import React from 'react';

import { useLocalSearchParams } from 'expo-router';

import { Text } from 'tamagui';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import BooksForm from '../../../../components/forms/book';

import { ICreateBookInput, IUpdateBookInput } from '../../../../models/book';
import { getBookById, updateBook } from '../../../../services/book-service';

export default () => {
  const { bookId } = useLocalSearchParams<{ bookId: string }>();
  const queryClient = useQueryClient();

  const {
    data: queryData,
    isPending: isQueryPending,
    isError: isQueryError,
    error: queryError,
  } = useQuery({
    queryKey: ['books', bookId],
    queryFn: () => getBookById(bookId),
  });

  const {
    mutate,
    isPending: isMutationPending,
    isError: isMutationError,
    error: mutationError,
  } = useMutation({
    mutationKey: ['books', bookId],
    mutationFn: updateBook,
    onSuccess: (data) => {
      queryClient.setQueryData(['books', bookId], data);
    },
  });

  if (isQueryPending || isMutationPending) {
    return <Text>Loading...</Text>;
  }

  if (isQueryError) {
    return <Text>Error: {queryError?.message}</Text>;
  }

  if (isMutationError) {
    return <Text>Error: {mutationError.message}</Text>;
  }

  const handleSubmit = (data: ICreateBookInput | IUpdateBookInput) => {
    mutate(data as IUpdateBookInput);
  };

  return (
    <>
      <Text>Edit Book</Text>
      <BooksForm formData={queryData} onSubmit={handleSubmit} />
    </>
  );
};
