import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PersistGate } from 'redux-persist/es/integration/react';
import { Provider } from 'react-redux';

import Counter from './screens/Counter';
import { store, persistor } from './store/store';

const onBeforeLift = () => console.warn('BEFORELIFT');

const Loading = () => (
  <View style={styles.container}>
    <Text style={styles.text}>LOADING</Text>
  </View>
);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate
        loading={<Loading />}
        persistor={persistor}
        onBeforeLift={onBeforeLift}>
        <Counter />
      </PersistGate>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  text: {
    fontSize: 30,
  },
});
