import React from 'react';
import {
  Text,
  Link,
  HStack,
  Center,
  Heading,
  Switch,
  useColorMode,
  NativeBaseProvider,
  extendTheme,
  VStack,
  Box,
} from 'native-base';

import Navigation from './src/CommonFeatures/Navigator/Navigation';
import {StatusBar} from 'react-native';
// Define the config
const config = {
  useSystemColorMode: true,
  initialColorMode: 'dark',
};

// extend the theme
export const theme = extendTheme({config});
const App = () => {
  return (
    <NativeBaseProvider theme={theme}>
      <StatusBar style="light" />
      <Navigation />
    </NativeBaseProvider>
  );
};

export default App;
