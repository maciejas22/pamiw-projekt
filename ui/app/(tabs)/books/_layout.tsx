import { Link, Slot, router } from 'expo-router';

import { Button } from 'tamagui';

export default () => {
  return (
    <>
      <Button marginVertical="$3" onPress={() => router.push(`/books/create`)}>
        Add Book
      </Button>
      <Slot />
    </>
  );
};
