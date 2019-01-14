import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import _ from 'lodash';
import {Navigation} from 'react-native-navigation';
import { ColorPicker } from 'react-native-color-picker'
import SQLite from 'react-native-sqlite-storage';
 
var db = SQLite.openDatabase({name: 'database.db', createFromLocation: '~www/database.db'});

export default class Pickingcolor extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
       name:  this.props.name,
       place: this.props.place,
       command: this.props.command
    }

  }

  goBack = (color) => {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'Creatingdevice',
        passProps: {
            colorOfTile: color,
            name: this.state.name,
            place: this.state.place,
            command: this.state.command
        },
        options: {
          topBar: {
            title: {
              text: 'New device'
            }
          }
        }
      }
    })
  }

  render() {

    return (
      <LinearGradient colors={['#A6fcd2','#Afd5f6']} style={styles.linearGradient}>

        <View style={styles.container}>

        <ColorPicker
                oldColor='#fa8072'
                onColorSelected={color => {
                    this.goBack(color)
                }}
                style={styles.colorPicker}
        />
        <Text>{this.state.name}</Text>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorPicker: {
      width: '85%',
      height: '70%'
  },
  btn: {
    borderWidth: 1,
    width: '35%',
    padding: 5,
    marginTop: '5%',
    borderRadius: 5
  },
  btnTxt: {
    fontSize: 20,
    textAlign: 'center'
  },

});
