// @flow
import * as React from 'react';
import {
  Provider as PaperProvider,
  DefaultTheme,
} from 'react-native-paper';

import Route from './Route';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2B7FC3',
  },
};

const App = () => (
  <PaperProvider theme={theme}>
    <Route />
  </PaperProvider>
);

export default App;
