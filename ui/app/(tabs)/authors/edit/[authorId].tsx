import React from 'react';

import { useLocalSearchParams } from 'expo-router';

import { Text } from 'tamagui';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import AuthorForm from '../../../../components/forms/author';

import {
  ICreateAuthorInput,
  IUpdateAuthorInput,
} from '../../../../models/author';
import {
  getAuthorById,
  updateAuthor,
} from '../../../../services/author-service';

export default () => {
  const { authorId } = useLocalSearchParams<{ authorId: string }>();
  const queryClient = useQueryClient();

  const {
    data: queryData,
    isPending: isQueryPending,
    isError: isQueryError,
    error: queryError,
  } = useQuery({
    queryKey: ['authors', authorId],
    queryFn: () => getAuthorById(authorId),
  });

  const {
    mutate,
    isPending: isMutationPending,
    isError: isMutationError,
    error: mutationError,
  } = useMutation({
    mutationKey: ['authors', authorId],
    mutationFn: updateAuthor,
    onSuccess: (data) => {
      queryClient.setQueryData(['authors', authorId], data);
    },
  });

  if (isQueryPending || isMutationPending) {
    return <Text>Loading...</Text>;
  }

  if (isQueryError) {
    return <Text>Error: {queryError.message}</Text>;
  }

  if (isMutationError) {
    return <Text>Error: {mutationError.message}</Text>;
  }

  const handleSubmit = (data: ICreateAuthorInput | IUpdateAuthorInput) => {
    mutate(data as IUpdateAuthorInput);
  };

  return (
    <>
      <Text>Edit Author</Text>
      <AuthorForm formData={queryData} onSubmit={handleSubmit} />
    </>
  );
};
