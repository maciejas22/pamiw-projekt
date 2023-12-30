import { Link } from 'expo-router';

import { Text, XStack, YStack, useTheme } from 'tamagui';

export default function NotFoundScreen() {
  const theme = useTheme();

  return (
    <>
      <YStack
        flex={1}
        justifyContent={'center'}
        alignItems={'center'}
        space={'$3'}
      >
        <XStack>
          <Text fontSize={20}>This screen doesn't exist.</Text>
        </XStack>
        <XStack>
          <Link href="/(tabs)/authors/list">
            <Text color={'$blue9'}>Go to home screen!</Text>
          </Link>
        </XStack>
      </YStack>
    </>
  );
}
