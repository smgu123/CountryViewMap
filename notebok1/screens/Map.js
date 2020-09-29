import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import React,{useEffect} from 'react';
import { Marker } from 'react-native-maps';
import { Callout } from 'react-native-maps'
import {

  View,
  Text,
  Button,
 StyleSheet,
 Image
} from 'react-native';

const styles = StyleSheet.create({
 container: {
   ...StyleSheet.absoluteFillObject,
   height: "100%",
   width: "100%",
   justifyContent: 'flex-end',
   alignItems: 'center',
 },
 map: {
   ...StyleSheet.absoluteFillObject,
 },
});

export default class Map extends React.Component {
  state={
    data : this.props.route.params.location,
    names : this.props.route.params.name,
    area : this.props.route.params.area
  }
  render(){
    const {data} = this.state
    const {names} =this.state
    const {area} = this.state

    return(
   <View style={styles.container}>
     <MapView
       provider={PROVIDER_GOOGLE} // remove if not using Google Maps
       style={styles.map}
       
     >
       <Marker
       key={1}
       coordinate={{
         latitude:data[0],
         longitude:data[1]
       }}>
          <Callout>
            <View>
      <Text>{names}</Text>
      <Text>Latitude : {data[0]}</Text>
      <Text>Longitude : {data[1]}</Text>
      <Text>Area : {area}</Text>
      </View>
          </Callout>
       </Marker>
     </MapView>
   </View>
);
      }
      }