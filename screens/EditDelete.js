import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import _ from 'lodash';
import { Navigation } from 'react-native-navigation';
import SQLite from 'react-native-sqlite-storage';

var db = SQLite.openDatabase({ name: 'database.db', createFromLocation: '~www/database.db' });

export default class EditDelete extends Component {

  constructor(props) {
    super(props);

    this.state = {
      id: '',
      name: '',
      place: '',
      command: '',
      colorOfTile: '',
    }

  }

  goToScreen = (screenName) => {
    Navigation.push(this.props.componentId, {
      component: {
        name: screenName,
        options: {
          topBar: {
            title: {
              text: screenName
            }
          }
        }
      }
    })
  }

  componentDidMount() {
    this.setState({
      id: this.props.id,
      name: this.props.name,
      place: this.props.place,
      command: this.props.command,
      colorOfTile: this.props.colorOfTile
    })
  }


  editDeviceAtDatabase = (id, name, place, command, colorOfTile) => {

    if (this.state.name === '' ||
      this.state.place === '' ||
      this.state.command === ''
    ) {

      Alert.alert("Uzupełnij wszystkie pola!")

    } else {

    db.transaction((tx) => {

      /*let query = `UPDATE devices 
        SET name='${name}', place='${place}', command='${command}', colorOfTile='${colorOfTile}'
        WHERE id='${id}'`;
      db.executeSql(query);*/
      
      db.executeSql('UPDATE devices SET name = ?, place = ?, command = ?, colorOfTile = ? WHERE id = ?;',	  
      [this.state.name, this.state.place, this.state.command, this.state.colorOfTile, this.state.id]	);


    });

    // Navigation.dismissAllModals();
    // this.closeModal();
    //this.goToScreen('Devices')
    Navigation.dismissModal(this.props.componentId);
    }
  }

  deleteData = (id) =>{

    db.transaction((tx) => {
      /*let query = `DROP FROM devices WHERE id='${id}'`;
      query = query + ")"*/

      db.executeSql('DELETE FROM devices WHERE id=?;',
      [this.state.id]);

    });

    // Navigation.dismissAllModals();
    // this.closeModal();
    //this.goToScreen('Devices')
    Navigation.dismissModal(this.props.componentId);
  }

  closeModal() {
    Navigation.dismissModal(this.props.componentId);
  }

  goToColorPicking = (componentName, title) => {
    Navigation.showModal({
      stack: {
        children: [{
          component: {
            name: componentName,
            passProps: {
              id: this.state.id,
              name: this.state.name,
              place: this.state.place,
              command: this.state.command
            },
            options: {
              topBar: {
                title: {
                  text: title
                }
              }
            }
          }
        }]
      }
    });
  }

  render() {

    return (
      <View style={styles.container}>
     
        <View style={styles.inputs}>

          <TextInput style={styles.textInput}
            onChangeText={(text) => {
              this.setState({
                name: text
              })
            }}
            value={this.state.name}
          />

          <TextInput style={styles.textInput} placeholder={this.state.place}
            onChangeText={(text) => {
              this.setState({
                place: text
              })
            }
            }
            value={this.state.place}
          />

          <TextInput style={styles.textInput} placeholder="Command"
            onChangeText={(text) => {
              this.setState({
                command: text
              })
            }
            }
            value={this.state.command}
          />

          <TouchableOpacity style={[{ backgroundColor: this.state.colorOfTile }, styles.inputColor]}
            onPress={() => this.goToColorPicking('PickingColor', 'Color picking')}>
            <Text></Text>
          </TouchableOpacity>


        </View>

        <View style={styles.menu}>

          <TouchableOpacity style={styles.btn}
            onPress={() => this.editDeviceAtDatabase(this.state.name, this.state.place, this.state.command, this.state.colorOfTile)} >
            <Text style={styles.btnTxt}>Save</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btn} onPress={() => this.closeModal()}>
            <Text style={styles.btnTxt}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btn} onPress={() => this.deleteData(this.state.id)}>
            <Text style={styles.btnTxt}>Delete</Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  inputs: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    padding: 10,
    marginTop: '10%',
    width: '75%',
    borderWidth: 1,
    fontSize: 18,
    textAlign: 'left',
    borderRadius: 5
  },
  inputColor: {
    padding: 10,
    marginTop: '10%',
    width: '75%',
    height: '25%',
    borderWidth: 1,
    fontSize: 18,
    textAlign: 'left',
    borderRadius: 5
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
  menu: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});
