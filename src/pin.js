import React, { PureComponent } from 'react';
const animalIcon = require('../icons/animal.png');
const insectIcon = require('../icons/insect.png');
const fishIcon = require('../icons/fish.png');

export default class Pin extends PureComponent {
  render() {
    return (
      <img src={animalIcon} />
    );
  }
}
