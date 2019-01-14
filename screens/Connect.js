import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header} from 'react-native-elements';

type Props = {};
export default class Connect extends Component<Props> {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View >
        <View>
          <Header
            centerComponent={{ text: 'Connect', style: { color: '#fff', fontSize: 20 } }}
          />
        </View>
        <Text style={styles.default}>Connect screen!</Text>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  default: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  }
});
