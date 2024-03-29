import React from 'react';
import { Icon } from 'expo';

import Colors from '../constants/Colors';

export default class HeaderIcon extends React.Component {
  render() {
    return (
      <Icon.Ionicons
        name={this.props.name}
        size={25}
        style={{ marginBottom: -3, marginRight: 20 }}
        color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    );
  }
}