import React from 'react';

import { router } from 'expo-router';

import {
  Button,
  ListItem,
  Separator,
  SizableText,
  Text,
  Theme,
  XStack,
  YGroup,
} from 'tamagui';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { IAuthor, IDeleteAuthorInput } from '../../../models/author';
import { deleteAuthor, getAuthors } from '../../../services/author-service';

export default function AuthorScreen() {
  const queryClient = useQueryClient();

  const {
    data: queryData,
    isPending: isQueryPending,
    isError: isQueryError,
    error: queryError,
  } = useQuery({
    queryKey: ['authors'],
    queryFn: getAuthors,
  });
  const { mutate, isPending: isMutationPending } = useMutation({
    mutationFn: deleteAuthor,
    onSuccess: (data) => {
      queryClient.setQueryData<IAuthor[]>(['authors'], (prevData) => {
        return prevData?.filter((item) => item.id !== data.id);
      });
    },
  });

  if (isQueryPending || isMutationPending) {
    return <Text>Loading...</Text>;
  }

  const handleDeleteAuthor = (author: IDeleteAuthorInput) => {
    mutate(author);
  };

  return (
    <YGroup space="$3" bordered separator={<Separator />}>
      {isQueryError && (
        <SizableText color="$red9">{queryError?.message}</SizableText>
      )}
      {queryData?.map((author) => (
        <Tile key={author.id} author={author} onDelete={handleDeleteAuthor} />
      ))}
    </YGroup>
  );
}

interface TileProps {
  author: IAuthor;
  onDelete: (author: IDeleteAuthorInput) => void;
}

export function Tile({ author, onDelete }: TileProps) {
  return (
    <ListItem hoverTheme>
      <Text>{author.name}</Text>
      <XStack space>
        <Theme name="yellow">
          <Button
            onPress={() => router.push(`/(tabs)/authors/edit/${author.id}`)}
          >
            Edit
          </Button>
        </Theme>
        <Theme name="red">
          <Button onPress={() => onDelete({ id: author.id })}>Delete</Button>
        </Theme>
      </XStack>
    </ListItem>
  );
}
