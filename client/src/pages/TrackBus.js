import React, {useState, useRef, useEffect} from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {useUserLocationContext} from '../contexts/locationContext';
import {googleMapApi} from '../../config';

export const TrackBus = () => {
  const mapRef = useRef();

  const [carLocation, setCarLocation] = useState({
    latitude: 37.4240936,
    longitude: -122.094922,
  });

  const {location: userLocation} = useUserLocationContext();

  console.log('userLocation', userLocation);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            ...carLocation,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          maxZoomLevel={18}
          showsTraffic={true}
          minZoomLevel={14}
          zoomControlEnabled={true}
          showsBuildings={true}
          showsMyLocationButton={true}
          followsUserLocation={true}
          showsCompass={true}
          scrollEnabled={true}
          zoomEnabled={true}
          pitchEnabled={true}
          rotateEnabled={true}>
          {carLocation ? <Marker coordinate={carLocation} /> : null}
          {userLocation ? <Marker coordinate={userLocation} /> : null}
          {carLocation && userLocation ? (
            <MapViewDirections
              origin={carLocation}
              destination={userLocation}
              apikey={googleMapApi}
              strokeColor="hotpink"
              strokeWidth={3}
              optimizeWaypoints={true}
              onReady={result => {
                mapRef.current.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    right: 30,
                    bottom: 100,
                    left: 30,
                    top: 100,
                  },
                });
              }}
            />
          ) : null}
        </MapView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
