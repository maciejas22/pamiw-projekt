import { Link, Slot, router } from 'expo-router';

import { Button } from 'tamagui';

export default () => {
  return (
    <>
      <Button
        marginVertical="$3"
        onPress={() => router.push(`/authors/create`)}
      >
        Add Author
      </Button>
      <Slot />
    </>
  );
};
