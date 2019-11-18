import React, { Component } from 'react';
import { render } from 'react-dom';
import MapGL, { Marker, NavigationControl } from 'react-map-gl';
import ControlPanel from './control-panel';
import Pin from './pin';
const csv = require('csv-parser');
const fs = require('fs');

const TOKEN = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

const navStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '10px'
};
const data = [
  {
    "key": 1,
    "name": "tuna",
    "latitude": 33.774282,
    "longitude": -84.439396,
    "type": "fish",
    "description": "Tuna is a beautiful fish"
  },
  {
    "key": 2,
    "name": "cactus",
    "latitude": 33.775100,
    "longitude": -84.439390,
    "type": "plant",
    "description": "Cactus is very nice"
  },
  {
    "key": 3,
    "name": "mosquito",
    "latitude": 33.774282,
    "longitude": -84.439800,
    "type": "insect",
    "description": "Mosquito is bad"
  },
  {
    "key": 4,
    "name": "deer",
    "latitude": 33.774282,
    "longitude": -84.439050,
    "type": "animal",
    "description": "Deer is Cute"
  },
];
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 33.774282,
        longitude: -84.439396,
        zoom: 18,
        bearing: 0,
        pitch: 0
      },
      events: {}
    };
  }

  _updateViewport = viewport => {
    this.setState({ viewport });
  };
  render() {
    const { viewport } = this.state;
    const markerPoints = this.props.markers.map(function (marker) {
      return (
        <Marker key={marker.key}
          longitude={marker.longitude}
          latitude={marker.latitude}
          offsetTop={-20}
          offsetLeft={-10}
        >
          <Pin type={marker.type} />
        </Marker>
      );
    });

    return (
      <MapGL
        {...viewport}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/mapbox/satellite-streets-v10"
        onViewportChange={this._updateViewport}
        mapboxApiAccessToken={TOKEN}
      >
        {markerPoints}
        <div className="nav" style={navStyle}>
          <NavigationControl onViewportChange={this._updateViewport} />
        </div>

        <ControlPanel
          containerComponent={this.props.containerComponent}
          events={this.state.events}
        />
      </MapGL>
    );
  }
}

export function renderToDom(container) {
  render(<App markers={data} />, container);
}
