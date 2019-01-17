import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { Header} from 'react-native-elements';
import { BleManager, Characteristic } from 'react-native-ble-plx';



export default class Connect extends Component{

  constructor(props) {
    super(props);
    this.manager = new BleManager();
    this.state = {
      value: 'red'
    }
  }

  componentWillMount(){
    const subscription = this.manager.onStateChange( (state)=>{
      if (state === 'PoweredOn'){
        this.scanAndConnect();
        subscription.remove();
      }
    }, true)
  }

  changeState(command) {

    const device = {
      id: 'A8:1B:6A:75:96:65',
      serviceUUID: 'FFE0',
      characteristicUUID: 'FFE1'
    }

    return this.manager.writeCharacteristicWithResponseForDevice(
      device.id, device.serviceUUID, device.characteristicUUID, btoa(command)

    ).then(response => {
      console.log(response)
    })
  }

  scanAndConnect() {
    this.manager.startDeviceScan(null, null, (error, device) => {
        if (error) {
            // Handle error (scanning will be stopped automatically)
            console.log(error)
            return
        }
        console.log(device)
        //Check if it is a device you are looking for based on advertisement data
        //or other criteria.
        if (device.name === 'MLT-BT05') {
            
            //Stop scanning as it's not necessary if you are scanning for one device.
            this.manager.stopDeviceScan();

            return device.connect()
            .then((device) => {
              return device.discoverAllServicesAndCharacteristics();
            }).then((characteristic) => {

            }).catch((error)=>{
              console.log(error);
            })

            //Proceed with connection.
        }
    });
}



  render() {
    return (
      <View >
        <View>
          <Header
            centerComponent={{ text: 'Connect', style: { color: '#fff', fontSize: 20 } }}
          />
        </View>
        <TouchableOpacity style={styles.tile} 
          onPress={() => this.changeState('red')}>
          <Text style={styles.tileTextPlus}>red</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tile} 
          onPress={() => this.changeState('green')}>
          <Text style={styles.tileTextPlus}>green</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tile} 
          onPress={() => this.changeState('blue')}>
          <Text style={styles.tileTextPlus}>blue</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tile} 
          onPress={() => this.changeState('off')}>
          <Text style={styles.tileTextPlus}>off</Text>
        </TouchableOpacity>
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
  },
  tile: {
    width: 150,
    height: 50,
    margin: 15,
    justifyContent: 'center'
  }
});
