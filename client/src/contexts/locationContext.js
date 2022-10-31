import React, {useEffect, useState} from 'react';
import {PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {contextFactory} from '../helper/contextFactory';

const [useUserLocationContext, UserLocationContext] = contextFactory();

const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Geolocation Permission',
        message: 'Can we access your location?',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === 'granted') {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};

const UserLocationContextProvider = ({children}) => {
  const [location, setLocation] = useState(false);
  // const {location} = useLocation();

  const getLocation = () => {
    const result = requestLocationPermission();
    console.log(result);
    result.then(res => {
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            setLocation({
              longitude: position?.coords?.longitude,
              latitude: position?.coords?.latitude,
            });
          },
          error => {
            setLocation(false);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    });
  };

  console.log(location);

  const values = {
    getLocation,
    location,
  };

  return (
    <UserLocationContext.Provider value={values}>
      {children}
    </UserLocationContext.Provider>
  );
};

export {UserLocationContextProvider, useUserLocationContext};
