/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BirdsList from './app/screens/BirdsList.jsx';
import BirdProfile from './app/screens/BirdProfile.jsx';
import store from './app/redux/store';
import {Provider} from 'react-redux';


const Home = ({navigation}) => {
  return (
    <View style={styles.container}>
      <BirdsList navigation={navigation} />
    </View>
  );
};

const BirdProfileScreen = ({route}) => (
  <View style={styles.container}>
    <BirdProfile route={route} />
  </View>
);

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
          <StatusBar
            barStyle={'dark-content'}
          />
            <Stack.Navigator
              screenOptions={{
                headerShown: true,
              }}>
              <Stack.Screen name="Aves" component={Home} />
              <Stack.Screen name="Información" component={BirdProfileScreen} />
            </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
});

export default App;
