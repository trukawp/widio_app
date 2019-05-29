import React from 'react';
import { Icon } from 'expo';

import Colors from '../constants/Colors';

export default class MovieIcon extends React.Component {
  render() {
    return (
      <Icon.Ionicons
        name={this.props.name}
        size={this.props.size}
        style={{opacity: 0.9, alignSelf: 'center'}}
        color={this.props.color}
      />
    );
  }
}