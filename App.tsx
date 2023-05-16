import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import MapView, {Marker} from 'react-native-maps';
import {Locations} from './src/data/Locations';
import {Picker} from '@react-native-picker/picker';

const MapScreen = () => {
  const [cityName, setCityName] = useState<any>('');
  const [location, setLocation] = useState<any>(null);

  const handleShowLocation = () => {
    const selectedLocation = Locations.find(
      location => location.name.toLowerCase() === cityName.toLowerCase(),
    );

    if (selectedLocation) {
      setLocation(selectedLocation);
    } else {
      setLocation(null);
    }
  };

  return (
    <View style={{flex: 1}}>
      <Text style={styles.mapText}>Map</Text>
      <View style={{marginBottom: 10, marginLeft: 15}}>
        <Picker
          selectedValue={cityName}
          onValueChange={(itemValue, itemIndex) => setCityName(itemValue)}>
          <Picker.Item label="Baku" value="Baku" />
          <Picker.Item label="Mingachevir" value="Mingachevir" />
          <Picker.Item label="Sumqayit" value="Sumqayit" />
          <Picker.Item label="Ganja" value="Ganja" />
          <Picker.Item label="Lankaran" value="Lankaran" />
          <Picker.Item label="Neftchala" value="Neftchala" />
        </Picker>
      </View>

      <MapView
        style={styles.map}
        region={
          location
            ? {
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.815,
                longitudeDelta: 0.8121,
              }
            : undefined
        }>
        {location && (
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
          />
        )}
      </MapView>

      <Button
        style={{marginTop: 10, marginHorizontal: 15}}
        mode="contained"
        onPress={handleShowLocation}>
        Show Location
      </Button>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  map: {
    height: 400,
    width: '100%',
  },
  mapText: {
    alignSelf: 'center',
    marginVertical: 25,
    fontSize: 22,
    color: 'white',
    fontWeight: '600',
  },
});
