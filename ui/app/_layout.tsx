import { Suspense, useEffect, useState } from 'react';

import { Link, Slot, SplashScreen } from 'expo-router';

import { Button, TamaguiProvider, Text, Theme, XStack, YStack } from 'tamagui';

import '@tamagui/core/reset.css';
import '@tamagui/polyfill-dev';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';

import config from '../tamagui.config';

export { ErrorBoundary } from 'expo-router';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const queryClient = new QueryClient();

  return (
    <Suspense fallback={<Text>Loading...</Text>}>
      <TamaguiProvider config={config} defaultTheme={theme}>
        <Theme name="blue">
          <QueryClientProvider client={queryClient}>
            <XStack
              alignItems="center"
              justifyContent="space-between"
              margin="$3"
            >
              <XStack space>
                <Link href="/(tabs)/authors/list">
                  <Button>Authors</Button>
                </Link>
                <Link href="/(tabs)/books/list">
                  <Button>Books</Button>
                </Link>
              </XStack>

              <Button
                onPress={() => {
                  setTheme(theme === 'light' ? 'dark' : 'light');
                }}
              >
                Change Theme
              </Button>
            </XStack>
            <YStack margin="$3">
              <Slot />
            </YStack>
          </QueryClientProvider>
        </Theme>
      </TamaguiProvider>
    </Suspense>
  );
}
