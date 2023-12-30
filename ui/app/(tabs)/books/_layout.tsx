import { Link, Slot } from 'expo-router';

import { Button } from 'tamagui';

export default () => {
  return (
    <>
      <Link href="/books/create">
        <Button marginVertical="$3">Add Book</Button>
      </Link>
      <Slot />
    </>
  );
};
