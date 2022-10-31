import React, {useState, useEffect} from 'react';
import {Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {contextFactory} from '../helper/contextFactory';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';

const [useAuthContext, AuthContext] = contextFactory();

const AuthContextProvider = ({children}) => {
  const [userInfo, setUserInfo] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    configureGoogleSign();
  }, []);

  useEffect(() => {
    async function fetchToken() {
      const uInf = await AsyncStorage.getItem('userInfo');
      if (uInf) {
        setUserInfo(JSON.parse(uInf));
      }
    }
    fetchToken();
  }, []);

  function configureGoogleSign() {
    GoogleSignin.configure({
      webClientId:
        '562364216569-imjrlrmm3sm4t66j93cgk653dql851vi.apps.googleusercontent.com',
      offlineAccess: false,
    });
  }

  async function signIn() {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const user = await GoogleSignin.signIn();
      const idToken = user?.idToken;
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      auth().signInWithCredential(googleCredential);
      setUserInfo(user?.user);
      setToken(user?.idToken);
      setError(null);
      setIsLoggedIn(true);
      await AsyncStorage.setItem('token', user?.idToken);
      await AsyncStorage.setItem('userInfo', JSON.stringify(user?.user));
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Login Success!',
        textBody: `Welcome ${user?.user?.name}`,
      });
    } catch (err) {
      if (err.code === statusCodes.SIGN_IN_CANCELLED) {
        // when user cancels sign in process,
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'Login Failed!',
          textBody: 'Process Cancelled',
        });
      } else if (err.code === statusCodes.IN_PROGRESS) {
        // when in progress already
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'Login Failed!',
          textBody: 'Process in progress',
        });
      } else if (err.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // when play services not available
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'Login Failed!',
          textBody: 'Play services are not available',
        });
      } else {
        // some other err
        console.log(err);
        setError(err);
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'Login Failed!',
          textBody: `Something else went wrong...${err.toString()}`,
        });
      }
    }
  }

  async function signOut() {
    console.log('CLICKED');
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      await AsyncStorage.removeItem('token');
      setIsLoggedIn(false);
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Logout!',
        textBody: 'You have been logged out successfully',
      });
    } catch (err) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Login Failed!',
        textBody: `Something else went wrong...${err.toString()}`,
      });
    }
  }

  async function getCurrentUserInfo() {
    try {
      const user = await GoogleSignin.signInSilently();
      setUserInfo(user);
    } catch (err) {
      if (err.code === statusCodes.SIGN_IN_REQUIRED) {
        // when user hasn't signed in yet
        Alert.alert('Please Sign in');
        setIsLoggedIn(false);
      } else {
        Alert.alert('Something else went wrong... ', err.toString());
        setIsLoggedIn(false);
      }
    }
  }

  const values = {
    userInfo,
    isLoggedIn,
    error,
    signIn,
    signOut,
    getCurrentUserInfo,
    setToken,
    token,
    setIsLoggedIn,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export {AuthContextProvider, useAuthContext};
