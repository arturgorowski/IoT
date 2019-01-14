import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ScrollView} from 'react-native';
import {Navigation} from 'react-native-navigation';
import SplashScreen from 'react-native-splash-screen';
import LinearGradient from 'react-native-linear-gradient';
import _ from 'lodash';
import SQLite from 'react-native-sqlite-storage';
 
var db = SQLite.openDatabase({name: 'database.db', createFromLocation: '~www/database.db'});

export default class Devices extends Component {

  constructor(props){
    super(props);

    this.state = {
      devices: []
    }

  }

  _downloadDataFromDatabase() {
    db.transaction((tx) => {
        tx.executeSql('SELECT * FROM devices;', [], (tx, results) => {
            var devices = [];
            for (let i = 0; i < results.rows.length; i++) {
                devices[i] = results.rows.item(i);
            }
            this.setState({devices: devices});

        });
    });
  };

  async componentDidMount() {

    SplashScreen.hide();
    this._downloadDataFromDatabase();

  }

  

  goToModalScreen = (componentName, title) => {
    Navigation.showModal({
      stack: {
        children: [{
          component: {
            name: componentName,
            passProps: {
              componentId: componentName
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
    let rowsOfTiles = [];
    let row = [];
    for (let i = 0; i < this.state.devices.length; i++) {
        row.push(
            <View key={i}>
                <TouchableOpacity style={[styles.tile, {backgroundColor: this.state.devices[i].colorOfTile}]}>
                  <Text style={styles.tileTextName}>{this.state.devices[i].name}</Text>
                  <Text style={styles.tileTextPlace}>{this.state.devices[i].place}</Text>
                </TouchableOpacity>
            </View>
        );

        if (i % 2 !== 0) {
            rowsOfTiles.push(
                <View style={styles.rowOfTiles} key={i}>
                    {row}
                </View>
            );
            row = [];
        }  if (i === this.state.devices.length - 1) {
            rowsOfTiles.push(
           
            <View style={styles.rowOfTiles} key={i}>
                {row}
               

                <TouchableOpacity style={styles.tile} onPress={() => this.goToModalScreen('Creatingdevice','New device')}>

                  <Text style={styles.tileTextPlus}>+</Text>

                </TouchableOpacity>

            </View>
    

            )
        }
    }


    return (
   
        <ScrollView style={styles.container}>
        
            {rowsOfTiles}
     
        </ScrollView>
    
    );
}
}

const styles = StyleSheet.create({
  LinearGradient: {
    flex: 1,
  },
  container: {
      flex: 1,
  },
  tile: {
      width: 150,
      height: 150,
      // borderColor: '#000000',
      borderWidth: 1,
      margin: 15,
      justifyContent: 'center'
  },
  rowOfTiles: {
      flexDirection: 'row',
      justifyContent: 'flex-start'
  },
  tileTextName: {
    fontSize: 28,
    textAlign: 'center'
  },
  tileTextPlace: {
    fontSize: 20,
    textAlign: 'center'
  },
  tileTextPlus: {
    fontSize: 96,
    textAlign: 'center'
  }

});