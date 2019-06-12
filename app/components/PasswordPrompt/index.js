import React, { PureComponent } from "react";
import { View,StyleSheet } from "react-native";
import { Input } from "react-native-elements";
import Dialog from "react-native-dialog";
import MovieIcon from '../MovieIcon';

const mathTasks = [{
  title: '5+2*8',
  result: 21,
}, {
  title: '2+7*5',
  result: 37,
}, {
  title: '9-2*4',
  result: 1,
}, {
  title: '6+8*3',
  result: 30,
}, {
  title: '9+9*8',
  result: 81,
}];

export default class PasswordPrompt extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
      task: {
        title: '',
        result: null,
      },
    }
  }

  componentDidMount() {
    this._getTask();
  }

  _getTask = () => {
    const taskNumber = Math.floor(Math.random() * (mathTasks.length - 1));
    const mathTask = mathTasks[taskNumber];

    this.setState({
      task: {
        title: mathTask.title,
        result: mathTask.result,
      },
      inputValue: '',
    });
  }

  _onOk = () => {
    const inputValue = parseInt(this.state.inputValue, 10);

    if (this.state.task.result === inputValue) {
      this.props.onOk();

      setTimeout(this._getTask, 200);
      return;
    }

    this._onCancel();
  }

  _onCancel = () => {
    this.props.onCancel();
    setTimeout(this._getTask, 200);
  }

  _onChangeText = (text) => this.setState({ inputValue: text });

  render() {
    return (
      <Dialog.Container visible={this.props.isVisible} onBackdropPress={this.props.onCancel}>
        <Dialog.Title style={{ fontSize: 30 }}>{this.state.task.title}</Dialog.Title>
        <View style={{ paddingBottom: 10 }}>
          <MovieIcon name='ios-hand' color='red' size={70} />
          <Input
            value={this.state.inputValue}
            onChangeText={this._onChangeText}
            keyboardType="number-pad"
            inputStyle={{ fontSize: 50, textAlign: 'center' }}
          />
        </View>
        <Dialog.Button label="ANULUJ" onPress={this._onCancel} />
        <Dialog.Button label="OK" onPress={this._onOk} />
      </Dialog.Container>
    )
  }
} 
