import React, {useEffect} from 'react';
import {StyleSheet, Dimensions, Alert, Image} from 'react-native';
import {Text, Button, Layout, Icon} from '@ui-kitten/components';
import {useSocketContext} from '../contexts/socketContext';
import {useUserLocationContext} from '../contexts/locationContext';
import {useAuthContext} from '../contexts/authContext';

const screen = Dimensions.get('window');
const HEIGHT = screen.height;
const WIDTH = screen.width;

const ArrowRightIcon = props => <Icon {...props} name="google" />;

export const HomePage = () => {
  const {userInfo, signIn} = useAuthContext();
  const socket = useSocketContext();
  const {location} = useUserLocationContext();

  useEffect(() => {
    if (socket && socket.emit) {
      socket?.emit('userlocation', JSON.stringify(location));
    }
  }, [socket, location]);

  console.log(userInfo);

  return (
    <Layout style={styles.container} level="1">
      <Text category="h1">Let's start</Text>
      <Text category="c1">Tracking Cou buses</Text>
      <Image
        style={styles.logo}
        source={require('../assets/GPSMarkerLogo.png')}
      />
      <Text style={styles.description}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit onsectetur
        adipiscing elit
      </Text>
      <Button
        style={styles.btn}
        onPress={() => signIn()}
        accessoryRight={ArrowRightIcon}>
        Login With Gmail
      </Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: WIDTH,
    height: HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  description: {
    textAlign: 'center',
    width: 270,
    marginBottom: 40,
    lineHeight: 20,
  },
  logo: {
    height: 230,
  },
  btn: {
    borderRadius: 10,
    backgroundColor: '#0369A0',
    borderColor: '#0369A0',
  },
});
