// @flow
import React from 'react';
import { GoogleMap, withGoogleMap, withScriptjs, Marker } from 'react-google-maps';
import { compose, withProps, lifecycle } from 'recompose';

const Map = ({ onMarkerMounted, onPositionChanged }) => (
  <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
    {<Marker
      position={{ lat: -34.397, lng: 150.644 }}
      draggable
      ref={onMarkerMounted}
      onPositionChanged={onPositionChanged}
    />}
  </GoogleMap>
);


export default compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: '200px' }} />,
    containerElement: <div style={{ height: '400px', width: '400px' }} />,
    mapElement: <div style={{ height: '200px', width: '400px' }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {};

      this.setState({
        position: null,
        onMarkerMounted: (ref) => {
          refs.marker = ref;
        },
        onPositionChanged: () => {
          const position = refs.marker.getPosition();
          console.log(position.toString());
        },
      });
    },
  }),
  withScriptjs,
  withGoogleMap,
)(Map);
