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

const data = getMarkersData();


function getMarkersData() {
  fs.readFile('./app.csv', function (err, data) {

    if (err) {
      return console.log(err);
    }

    //Convert and store csv information into a buffer. 
    bufferString = data.toString();
    let markers = [];
    let headers = arr[0].split(',');
    for (let i = 1; i < arr.length; i++) {
      let data = arr[i].split(',');
      let obj = {};
      for (let j = 0; j < data.length; j++) {
        obj[headers[j].trim()] = data[j].trim();
      }
      markers.push(obj);
    }
    console.log(markers);
    return markers
  });
}
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
      marker: {
        latitude: 33.774282,
        longitude: -84.439396,
        type: "fish"
      },
      events: {}
    };
  }

  _updateViewport = viewport => {
    this.setState({ viewport });
  };
  render() {
    const { viewport, marker } = this.state;

    return (
      <MapGL
        {...viewport}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/mapbox/satellite-streets-v10"
        onViewportChange={this._updateViewport}
        mapboxApiAccessToken={TOKEN}
      >
        <Marker
          longitude={marker.longitude}
          latitude={marker.latitude}
          offsetTop={-20}
          offsetLeft={-10}
        >
          <Pin type={marker.type} />
        </Marker>

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
  render(<App />, container);
}
