import React, { Component } from 'react';
import { render } from 'react-dom';
import MapGL, { Marker, NavigationControl } from 'react-map-gl';
import ControlPanel from './control-panel';
const animalIcon = require('../icons/animal.png');
const insectIcon = require('../icons/insect.png');
const fishIcon = require('../icons/fish.png');
const plantIcon = require('../icons/plant.png');

const TOKEN = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

const navStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '10px'
};
const data = [
  {
    "name": "tuna",
    "latitude": 33.771482,
    "longitude": -84.439396,
    "type": "fish",
    "description": "Tuna is a beautiful fish",
    "image": "https://www.un.org/en/events/tunaday/assets/img/featured-image-index-sm.jpg"
  },
  {
    "name": "cactus",
    "latitude": 33.775650,
    "longitude": -84.436490,
    "type": "plant",
    "description": "Cactus is very nice",
    "image": "https://images.homedepot-static.com/productImages/2271ed2f-8ce4-4547-9cf2-a04beb1cb38d/svn/nearly-natural-artificial-plants-6328-64_1000.jpg"
  },
  {
    "name": "mosquito",
    "latitude": 33.774282,
    "longitude": -84.439800,
    "type": "insect",
    "description": "Mosquito is bad",
    "image": "https://cdn.orkin.com/images/mosquitoes/mosquito-illustration_2092x1660.jpg"
  },
  {
    "name": "deer",
    "latitude": 33.774682,
    "longitude": -84.446650,
    "type": "animal",
    "description": "Deer is Cute",
    "image": "https://images.pexels.com/photos/34231/antler-antler-carrier-fallow-deer-hirsch.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500"

  },
];
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 33.774282,
        longitude: -84.439396,
        zoom: 16,
        bearing: 0,
        pitch: 0
      },
      selectedMarker: null
    };
    this.handleClick = this.handleClick.bind(this);
  }

  _updateViewport = viewport => {
    this.setState({ viewport });
  };


  handleClick(e, id) {
    e.preventDefault();
    console.log(id)
    console.log(this.props.markers[id])
    this.setState({ selectedMarker: this.props.markers[id] })
  }
  render() {
    const { viewport } = this.state;
    const markerPoints = this.props.markers.map(function (marker, idx) {
      let iconType = animalIcon;
      if (marker.type == "insect") {
        iconType = insectIcon
      }
      if (marker.type == "fish") {
        iconType = fishIcon
      }
      if (marker.type == "plant") {
        iconType = plantIcon
      }
      return (
        <Marker key={idx}
          longitude={marker.longitude}
          latitude={marker.latitude}
          offsetTop={-20}
          offsetLeft={-10}
        >
          <img
            className="icon"
            src={iconType}
            onClick={(e) => this.handleClick(e, idx)}
            alt="my image"
            style={{ "pointer-events": "all" }}
          />
        </Marker>
      );
    }.bind(this));


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
          selectedMarker={this.state.selectedMarker}
        />
      </MapGL>
    );
  }
}

export function renderToDom(container) {
  render(<App markers={data} />, container);
}
