import React from 'react';
import {Avatar, Text, ListItem} from '@ui-kitten/components';

const Distance = ({distance}) => <Text category="label">{distance}</Text>;

const ItemImage = props => (
  <Avatar
    {...props}
    style={[props.style, {tintColor: null}]}
    source={require('../assets/tracking-app.png')}
  />
);

export const RunningBus = ({item}) => {
  const handleOnPress = () => {
    console.log(item);
  };

  return (
    <ListItem
      onPress={handleOnPress}
      title={item.busName}
      description={item.route}
      accessoryLeft={ItemImage}
      accessoryRight={<Distance distance={item.distance} />}
    />
  );
};
