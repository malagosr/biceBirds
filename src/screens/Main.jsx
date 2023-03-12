import React from 'react';
import { StyleSheet, View } from 'react-native';
import BirdsList from './BirdsList';
import BirdsProfile from './BirdsProfile.jsx';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <BirdsList/>
    </View>
  );
};

export default Main;