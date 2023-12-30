import { Link, Slot } from 'expo-router';

import { Button } from 'tamagui';

export default () => {
  return (
    <>
      <Link href="/authors/create">
        <Button marginVertical="$3">Add Author</Button>
      </Link>
      <Slot />
    </>
  );
};
