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
          <strong>Latitude:</strong> {item.latitude}
        </div>
        <div>
          <strong>Longitude:</strong> {item.longitude}
        </div>
        <div>
          <strong>Description:</strong> {item.description}
        </div>
        <div>
          <img src={item.image} />
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
