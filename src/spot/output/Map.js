// @flow
import React from 'react';
import {
  GoogleMap,
  withGoogleMap,
  withScriptjs,
  Marker,
} from 'react-google-maps';
import { compose, withProps, lifecycle } from 'recompose';

type Props = {|
  +onMarkerMounted: () => (void),
  +onPositionChanged: ((string) => (void)) => (void),
  +onMarkerPositionChange: (string) => (void),
  +position: {| +latitude: number, +longitude: number |}
|};
const Map = ({
  position,
  onMarkerMounted,
  onPositionChanged,
  onMarkerPositionChange,
}: Props) => (
  <GoogleMap defaultZoom={8} defaultCenter={{ lat: position.latitude, lng: position.longitude }}>
    {<Marker
      position={{ lat: position.latitude, lng: position.longitude }}
      draggable
      ref={onMarkerMounted}
      onPositionChanged={onPositionChanged(onMarkerPositionChange)}
    />}
  </GoogleMap>
);

export default compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: '200px' }} />,
    containerElement: <div style={{ height: '220px', width: '400px' }} />,
    mapElement: <div style={{ height: '200px', width: '400px' }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {};

      this.setState({
        onMarkerMounted: (ref) => {
          refs.marker = ref;
        },
        onPositionChanged: onMarkerPositionChange => () => {
          const matches = refs.marker.getPosition().toString().match(/\((.+),\s(.+)\)/);
          onMarkerPositionChange({
            latitude: parseFloat(matches[1]),
            longitude: parseFloat(matches[2]),
          });
        },
      });
    },
  }),
  withScriptjs,
  withGoogleMap,
)(Map);
