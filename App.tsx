/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {View, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BirdsList from './src/screens/BirdsList.jsx';
import BirdProfile from './src/screens/BirdProfile.jsx';
import {store} from './src/app/store';
import {Provider} from 'react-redux'

const Home = ({navigation}) => {
  return (
    <View style={styles.container}>
      <BirdsList navigation={navigation} />
    </View>
  );
};

const BirdProfileScreen = ({navigation, route}) => (
  <View style={styles.container}>
    <BirdProfile navegation={navigation} route={route} />
  </View>
);

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: true,
          }}>
          <Stack.Screen name="Birds" component={Home} />
          <Stack.Screen name="Profile" component={BirdProfileScreen} />
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
