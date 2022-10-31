import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Icon} from '@ui-kitten/components';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const bottom = 65;

const CenterLocation = ({onHandleCenterLocation}) => {
  return (
    <View style={[styles.container, {top: HEIGHT - bottom}]}>
      <Icon name="home-outline" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 9,
    position: 'absolute',
    width: 45,
    height: 45,
    backgroundColor: '#ffffff',
    left: WIDTH - 70,
    borderRadius: 50,
    shadowColor: '#000000',
    elevation: 7,
    shadowRadius: 5,
    shadowOpacity: 1.0,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default CenterLocation;
