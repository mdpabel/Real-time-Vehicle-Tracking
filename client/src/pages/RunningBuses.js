import React from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
import {Divider, List, Text, Avatar, ListItem} from '@ui-kitten/components';
import {useNavigation} from '@react-navigation/native';

const screen = Dimensions.get('window');
const HEIGHT = screen.height;
const WIDTH = screen.width;

const data = new Array(8).fill({
  busName: 'bus -01',
  route: 'Campus-Kandirpar-Campus',
  distance: '20 m',
});

const Distance = ({distance}) => <Text category="label">{distance}</Text>;

const ItemImage = props => (
  <Avatar
    {...props}
    style={[props.style, {tintColor: null}]}
    source={require('../assets/tracking-app.png')}
  />
);

export const RunningBuses = () => {
  const navigation = useNavigation();

  const handleOnPress = item => {
    navigation.navigate('Location Track');
  };

  const runningBus = ({item}) => {
    return (
      <ListItem
        onPress={() => handleOnPress(item)}
        title={item.busName}
        description={item.route}
        accessoryLeft={ItemImage}
        accessoryRight={<Distance distance={item.distance} />}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text} category="h2">
        Nearby...
      </Text>
      <List
        style={styles.lists}
        data={data}
        ItemSeparatorComponent={Divider}
        renderItem={runningBus}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  lists: {
    maxHeight: HEIGHT / 2,
  },
  text: {
    paddingLeft: 15,
    paddingBottom: 15,
    fontSize: 30,
  },
});
