import React, { PureComponent } from 'react';
const animalIcon = require('../icons/animal.png');
const insectIcon = require('../icons/insect.png');
const fishIcon = require('../icons/fish.png');
const plantIcon = require('../icons/plant.png');
export default class Pin extends PureComponent {
  render() {
    const { type } = this.props;
    let iconType = animalIcon;
    if (type == "insect") {
      iconType = insectIcon
    }
    if (type == "fish") {
      iconType = fishIcon
    }
    if (type == "plant") {
      iconType = plantIcon
    }
    return (
      <img src={iconType} />
    );
  }
}
