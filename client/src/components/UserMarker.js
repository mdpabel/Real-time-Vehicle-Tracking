import React, {useState, useEffect, useRef} from 'react';
import {Image} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

const LATITUDE = 23.4194;
const LONGITUDE = 91.1365;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = 0.04;

export default function CarMarker() {
  return (
    <Marker
      coordinate={{
        latitude: 12.9771191896563,
        longitude: 77.5857120256672,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }}
    />
  );
}
