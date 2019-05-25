import React from 'react';
import { ScrollView,StyleSheet,View } from 'react-native';
import { Card,Button,Text } from "react-native-elements";
import { onSignOut } from "../auth";

export default class ProfileScreen extends React.Component {
  // static navigationOptions = {
  //   header: null,
  // };

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={{ paddingVertical: 20 }}>
        <Card title="Pawel Trukawka">
          <View
            style={{
              backgroundColor: "#bcbec1",
              alignItems: "center",
              justifyContent: "center",
              width: 80,
              height: 80,
              borderRadius: 40,
              alignSelf: "center",
              marginBottom: 20
            }}
          >
            <Text style={{ color: "white", fontSize: 28 }}>PT</Text>
          </View>
          <Button
            backgroundColor="#03A9F4"
            title="SIGN OUT"
            onPress={() => onSignOut().then(() => navigate("Home"))}
          />
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
});