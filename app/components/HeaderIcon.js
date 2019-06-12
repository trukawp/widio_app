import React, { PureComponent } from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'expo';

import Colors from '../constants/Colors';

export default class HeaderIcon extends PureComponent {
  onPress = () => {
    if (this.props.onPress) this.props.onPress();
    return;
  }

  render() {
    return (
      <TouchableOpacity onPress={this.onPress}>
        <Icon.Ionicons
          name={this.props.name}
          size={30}
          style={{ marginBottom: -3, marginRight: 20 }}
          color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
        />
      </TouchableOpacity>
    );
  }
}
