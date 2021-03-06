import React, { Component } from 'react';
import { render } from 'react-dom';
import MapGL, { Marker, NavigationControl } from 'react-map-gl';
import ControlPanel from './control-panel';
const animalIcon = require('../icons/animal.png');
const insectIcon = require('../icons/insect.png');
const fishIcon = require('../icons/fish.png');
const plantIcon = require('../icons/plant.png');
const unknownIcon = require('../icons/unknown.png');
const birdIcon = require('../icons/bird.png');
const reptileIcon = require('../icons/reptile.png');

const plantTypes = ["Plantae", "Fungi"];
const animalTypes = ["Mammalia"];
const reptileTypes = ["Amphibians", "Mollusca", "Reptilia"];
const birdTypes = ["Aves"];
const fishTypes = ["Actinopterygii", "Animalia", "Actinopterygii", "Actinopterygii"];
const insectTypes = ["Arachnida", "Insecta"];

const TOKEN = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

const navStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '10px'
};
function getSpeciesIcon(type) {
  if (plantTypes.includes(type)) {
    return plantIcon
  }
  if (fishTypes.includes(type)) {
    return fishIcon
  }
  if (animalTypes.includes(type)) {
    return animalIcon
  }
  if (reptileTypes.includes(type)) {
    return reptileIcon
  }
  if (birdTypes.includes(type)) {
    return birdIcon
  }
  if (insectTypes.includes(type)) {
    return insectIcon
  }
  return unknownIcon
}
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
      selectedMarker: null,
      markers: null,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    fetch('http://localhost:3000/get_data', { mode: 'cors' })
      .then(result => {
        return result.json();
      })
      .then(data => {
        this.setState({ markers: data })
      });
  }



  _updateViewport = viewport => {
    this.setState({ viewport });
  };


  handleClick(e, id) {
    e.preventDefault();
    this.setState({ selectedMarker: this.state.markers[id] })
  }
  render() {
    const { viewport } = this.state;

    const markerPoints = this.state.markers != null ? (this.state.markers.map(function (marker, idx) {
      let iconType = getSpeciesIcon(marker.iconic_taxon_name)
      return (
        <Marker key={idx}
          longitude={parseFloat(marker.longitude)}
          latitude={parseFloat(marker.latitude)}
          offsetTop={-20}
          offsetLeft={-10}
        >
          <img
            className="icon"
            src={iconType}
            onClick={(e) => this.handleClick(e, idx)}
            alt="my image"
            style={{ "pointerEvents": "all" }}
          />
        </Marker>
      );
    }.bind(this))) : null;


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
  render(<App />, container);
}
