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
  YStack,
} from 'tamagui';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { IBook, IDeleteBookInput } from '../../../models/book';
import { deleteBook, getBooks } from '../../../services/book-service';

export default function BookScreen() {
  const queryClient = useQueryClient();

  const {
    data: queryData,
    isPending: isQueryPending,
    isError: isQueryError,
    error: queryError,
  } = useQuery({
    queryKey: ['books'],
    queryFn: getBooks,
  });
  const { mutate, isPending: isMutationPending } = useMutation({
    mutationFn: deleteBook,
    onSuccess: (data) => {
      queryClient.setQueryData<IBook[]>(['books'], (prevData) => {
        return prevData?.filter((item) => item.id !== data.id);
      });
    },
  });

  if (isQueryPending || isMutationPending) {
    return <Text>Loading...</Text>;
  }

  const handleBookDelete = (book: IDeleteBookInput) => {
    mutate(book);
  };

  return (
    <YGroup space="$3" bordered separator={<Separator />}>
      {isQueryError && (
        <SizableText color="$red9">{queryError?.message}</SizableText>
      )}
      {queryData?.map((book) => (
        <Tile key={book.id} book={book} onDelete={handleBookDelete} />
      ))}
    </YGroup>
  );
}

interface TileProps {
  book: IBook;
  onDelete: (author: IDeleteBookInput) => void;
}

export function Tile({ book, onDelete }: TileProps) {
  return (
    <ListItem hoverTheme>
      <YStack flex={1} justifyContent="space-between">
        <Text>{book.title}</Text>
        <Text>{book.authorName}</Text>
      </YStack>
      <XStack space>
        <Theme name="yellow">
          <Button onPress={() => router.push(`/(tabs)/books/edit/${book.id}`)}>
            Edit
          </Button>
        </Theme>
        <Theme name="red">
          <Button onPress={() => onDelete({ id: book.id })}>Delete</Button>
        </Theme>
      </XStack>
    </ListItem>
  );
}
