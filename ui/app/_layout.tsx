import { Suspense, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Slot, SplashScreen, router } from 'expo-router';

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
    <TamaguiProvider config={config} defaultTheme={theme}>
      <Suspense fallback={<Text>Loading...</Text>}>
        <Theme name="blue">
          <QueryClientProvider client={queryClient}>
            <SafeAreaView
              style={{
                flex: 1,
                backgroundColor: theme === 'light' ? '#F8F8F8' : '#151515',
              }}
            >
              <XStack
                alignItems="center"
                justifyContent="space-between"
                margin="$3"
              >
                <XStack space>
                  <Button onPress={() => router.push('/(tabs)/authors/list')}>
                    Authors
                  </Button>
                  <Button onPress={() => router.push('/(tabs)/books/list')}>
                    Books
                  </Button>
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
            </SafeAreaView>
          </QueryClientProvider>
        </Theme>
      </Suspense>
    </TamaguiProvider>
  );
}
