/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {AlertNotificationRoot} from 'react-native-alert-notification';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {default as theme} from './theme.json';
import {AuthContextProvider, useAuthContext} from './src/contexts/authContext';
import {
  SocketContextProvider,
  useSocketContext,
} from './src/contexts/socketContext';
import {AppNavigator} from './src/components/Navigation';
import {
  UserLocationContextProvider,
  useUserLocationContext,
} from './src/contexts/locationContext';
import {DarkModeCOntextProvider} from './src/contexts/darkModeContext';

const Root = () => {
  const [isTryingLoggin, setIsTryingLogin] = useState(true);
  const {setToken, setIsLoggedIn, userInfo} = useAuthContext();
  const {getLocation, location} = useUserLocationContext();
  const socket = useSocketContext();

  useEffect(() => {
    if (location && userInfo) {
      const data = {
        longitude: location?.longitude,
        latitude: location?.latitude,
        member: userInfo?.name,
      };
      socket.emit('userlocation', JSON.stringify(data));
    }
  }, [location, userInfo]);

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
        setIsLoggedIn(true);
      }
      setIsTryingLogin(false);
    }
    fetchToken();
  }, [setIsLoggedIn, setToken]);

  if (isTryingLoggin) {
    return SplashScreen.hide();
  }

  return <AppNavigator />;
};

const App = () => {
  return (
    <DarkModeCOntextProvider>
      <AlertNotificationRoot>
        <AuthContextProvider>
          <SocketContextProvider>
            <UserLocationContextProvider>
              <IconRegistry icons={EvaIconsPack} />
              <ApplicationProvider {...eva} theme={{...eva.light, ...theme}}>
                <Root />
              </ApplicationProvider>
            </UserLocationContextProvider>
          </SocketContextProvider>
        </AuthContextProvider>
      </AlertNotificationRoot>
    </DarkModeCOntextProvider>
  );
};

export default App;
