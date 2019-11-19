import React, { PureComponent } from 'react';

const defaultContainer = ({ children }) => <div className="control-panel">{children}</div>;


function MarkerItem(props) {
  const item = props.item;
  if (item) {
    return (
      <div>
        <div>
          <strong>Name:</strong> {item.name}
        </div>
        <div>
          <strong>Type:</strong> {item.type}
        </div>
        <div>
          <strong>Location:</strong> ({item.latitude}, {item.longitude})
        </div>
        <div>
          <strong>Species:</strong> {item.species_guess ? item.species_guess : "unknown"}
        </div>
        <div>
          <strong>Scientific Name:</strong> {item.scientific_name ? item.scientific_name : "unknown"}
        </div>
        <div>
          <strong>Common Name:</strong> {item.common_name ? item.common_name : "unknown"}
        </div>
        <div>
          <strong>Taxonomy Name:</strong> {item.iconic_taxon_name ? item.iconic_taxon_name : "unknown"}
        </div>
        <div>
          <img src={item.image_url} />
        </div>
      </div>
    );
  }
  return null;
}

export default class ControlPanel extends PureComponent {


  render() {
    const Container = this.props.containerComponent || defaultContainer;
    const { selectedMarker } = this.props;
    return (
      <Container>
        <h3>Wildlife Mapping</h3>
        <MarkerItem item={selectedMarker} />
      </Container>
    );
  }
}
