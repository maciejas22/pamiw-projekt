import React from 'react';

import { SizableText, Text } from 'tamagui';

import { useMutation } from '@tanstack/react-query';

import AuthorForm from '../../../components/forms/author';

import { ICreateAuthorInput, IUpdateAuthorInput } from '../../../models/author';
import { createAuthor } from '../../../services/author-service';

export default () => {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createAuthor,
  });

  if (isPending) {
    return <Text>Loading...</Text>;
  }

  const handleSubmit = (data: ICreateAuthorInput | IUpdateAuthorInput) => {
    mutate(data as ICreateAuthorInput);
  };

  return (
    <>
      <Text>Create Author</Text>
      {isError && <SizableText color="$red9">{error?.message}</SizableText>}
      <AuthorForm onSubmit={handleSubmit} />
    </>
  );
};
