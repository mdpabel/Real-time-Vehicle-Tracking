/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
  Layout,
  Text,
} from '@ui-kitten/components';
import {RunningBuses} from './../pages/RunningBuses';
import {TrackBus} from './../pages/TrackBus';
import {HomePage} from './../pages/Home';
import {useSocketContext} from '../contexts/socketContext';
import {useAuthContext} from '../contexts/authContext';
import SettingsScreen from './../pages/Settings';

const Home = props => <Icon {...props} name="home-outline" />;

const Car = props => <Icon {...props} name="car-outline" />;

const Settings = props => <Icon {...props} name="settings-outline" />;

const BottomTabBar = ({navigation, state}) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab icon={Car} />
    <BottomNavigationTab icon={Settings} />
  </BottomNavigation>
);

const Bottom = createBottomTabNavigator();

const AuthenticatedApp = () => {
  return (
    <Bottom.Navigator tabBar={props => <BottomTabBar {...props} />}>
      <Bottom.Screen
        options={{
          headerStyle: {},
          headerShown: false,
        }}
        name="Running Buses"
        component={RunningBuses}
      />
      <Bottom.Screen
        options={{
          headerStyle: {},
          headerShown: false,
        }}
        name="Settings"
        component={SettingsScreen}
      />
      <Bottom.Screen
        options={{
          headerStyle: {},
          headerShown: false,
        }}
        name="Location Track"
        component={TrackBus}
      />
    </Bottom.Navigator>
  );
};

const Stack = createStackNavigator();

const UnauthenticatedApp = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerStyle: {},
          headerShown: false,
        }}
        name="Home"
        component={HomePage}
      />
    </Stack.Navigator>
  );
};

export const AppNavigator = () => {
  const {isLoggedIn} = useAuthContext();
  return (
    <NavigationContainer>
      {isLoggedIn ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  nav: {},
});
