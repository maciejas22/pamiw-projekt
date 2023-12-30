import React, { useState } from 'react';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';

import {
  Adapt,
  Button,
  Form,
  Input,
  Label,
  Select,
  Sheet,
  Spacer,
  Text,
} from 'tamagui';

import { useQuery } from '@tanstack/react-query';

import { ICreateBookInput, IUpdateBookInput } from '../../models/book';
import { getAuthors } from '../../services/author-service';

interface BooksFormProps {
  formData?: IUpdateBookInput;
  onSubmit: (data: ICreateBookInput | IUpdateBookInput) => void;
}

const BooksForm = (props: BooksFormProps) => {
  const {
    data: queryData,
    isPending: isQueryPending,
    isError: isQueryError,
    error: queryError,
  } = useQuery({
    queryKey: ['authors'],
    queryFn: getAuthors,
  });
  const [formData, setFormData] = useState<ICreateBookInput | IUpdateBookInput>(
    props.formData ?? {
      title: '',
      authorId: 0,
    },
  );
  const [author, setAuthor] = useState(formData.authorId.toString());

  const handleChange = (
    name: string,
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    setFormData({
      ...formData,
      [name]: e.nativeEvent.text,
    });
  };

  const handleAuthorChange = (authorId: string) => {
    setAuthor(authorId);
    setFormData({
      ...formData,
      authorId: parseInt(authorId, 10),
    });
  };

  const handleSubmit = () => {
    props.onSubmit(formData);
  };

  if (isQueryPending) {
    return <Text>Loading...</Text>;
  }

  if (isQueryError) {
    return <Text>queryError.message</Text>;
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Spacer />
      <Input
        placeholder="Enter book title"
        value={formData.title}
        onChange={(e) => handleChange('title', e)}
      />
      <Label>Select Author:</Label>
      <Select
        id="author"
        value={author === '0' ? undefined : author}
        onValueChange={handleAuthorChange}
        disablePreventBodyScroll
      >
        <Select.Trigger>
          <Select.Value placeholder="Select author" />
        </Select.Trigger>

        <Adapt when="sm" platform="touch">
          <Sheet
            native={false}
            modal
            dismissOnSnapToBottom
            animationConfig={{
              type: 'spring',
              damping: 20,
              mass: 1.2,
              stiffness: 250,
            }}
          >
            <Sheet.Frame>
              <Sheet.ScrollView>
                <Adapt.Contents />
              </Sheet.ScrollView>
            </Sheet.Frame>
            <Sheet.Overlay
              animation="lazy"
              enterStyle={{ opacity: 0 }}
              exitStyle={{ opacity: 0 }}
            />
          </Sheet>
        </Adapt>

        <Select.Content zIndex={200000}>
          <Select.Viewport
            animation="quick"
            animateOnly={['transform', 'opacity']}
            enterStyle={{ o: 0, y: -10 }}
            exitStyle={{ o: 0, y: 10 }}
            minWidth={200}
          >
            <Select.Group>
              <Select.Label>Authors</Select.Label>
              {queryData?.map((author) => {
                return (
                  <Select.Item
                    index={author.id}
                    key={author.id}
                    value={author.id.toString()}
                  >
                    <Select.ItemText>{author.name}</Select.ItemText>
                  </Select.Item>
                );
              })}
            </Select.Group>
          </Select.Viewport>
        </Select.Content>
      </Select>

      <Spacer />
      <Form.Trigger asChild>
        <Button>Submit</Button>
      </Form.Trigger>
    </Form>
  );
};

export default BooksForm;
