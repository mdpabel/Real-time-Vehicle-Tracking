import React from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
import {
  Layout,
  Avatar,
  Text,
  Toggle,
  ListItem,
  Icon,
  Button,
} from '@ui-kitten/components';
import {useAuthContext} from '../contexts/authContext';

const screen = Dimensions.get('screen');
const HEIGHT = screen.height;
const WIDTH = screen.width;

export const DarkMode = () => {
  const [checked, setChecked] = React.useState(false);

  const onCheckedChange = isChecked => {
    setChecked(isChecked);
  };

  return <Toggle checked={checked} onChange={onCheckedChange} />;
};

const LogoutButton = props => <Icon {...props} name="log-out-outline" />;
const UserIcon = props => <Icon {...props} name="person-remove-outline" />;
const darkModeIcon = props => <Icon {...props} name="moon-outline" />;
const alarmIcon = props => <Icon {...props} name="bell-off-outline" />;
const clockIcon = props => <Icon {...props} name="clock-outline" />;

const SettingsScreen = () => {
  const {signOut, userInfo} = useAuthContext();

  return (
    <Layout style={styles.container}>
      <Layout style={styles.layout}>
        <Avatar
          style={styles.avatar}
          shape="rounded"
          source={{
            uri: userInfo?.photo,
          }}
        />
      </Layout>
      <Layout style={styles.profile}>
        <Text style={styles.text} category="h2">
          {userInfo?.name}
        </Text>
        <Text style={styles.text} category="p2">
          {userInfo?.email}
        </Text>
      </Layout>
      <Layout style={styles.preferences}>
        <Text style={styles.preferenceTitle} category="p2">
          PREGERENCES
        </Text>
        <ListItem
          title="Dark Mode"
          accessoryRight={DarkMode}
          accessoryLeft={darkModeIcon}
        />

        <ListItem
          onPress={() => console.log('Click')}
          title="Set Alarm"
          accessoryRight={clockIcon}
          accessoryLeft={alarmIcon}
        />
        <ListItem
          onPress={() => signOut()}
          title="Logout"
          accessoryRight={LogoutButton}
          accessoryLeft={UserIcon}
        />
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: WIDTH,
    height: HEIGHT,
    padding: 30,
  },
  layout: {
    marginBottom: 20,
  },
  profile: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 20,
    alignItems: 'center',
  },

  preferences: {},

  preferenceTitle: {
    backgroundColor: '#eaeaea',
    width: WIDTH - 60,
    padding: 8,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    fontWeight: 'bold',
    color: '#4a4747',
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
});

export default SettingsScreen;
