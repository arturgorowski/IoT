import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header} from 'react-native-elements';
import { BleManager } from 'react-native-ble-plx';



export default class Connect extends Component{

  constructor(props) {
    super(props);
    this.manager = new BleManager();
  }

  componentWillMount(){
    const subscription = this.manager.onStateChange( (state)=>{
      if (state === 'PoweredOn'){
        this.scanAndConnect();
        subscription.remove();
      }
    }, true)
  }

  scanAndConnect() {
    this.manager.startDeviceScan(null, null, (error, device) => {
        if (error) {
            // Handle error (scanning will be stopped automatically)
            console.log(error)
            return
        }
        console.log(device)
        // Check if it is a device you are looking for based on advertisement data
        // or other criteria.
        //if (device.name === 'TI BLE Sensor Tag' || 
            //device.name === 'SensorTag') {
            
            // Stop scanning as it's not necessary if you are scanning for one device.
            //this.manager.stopDeviceScan();

            // Proceed with connection.
        //}
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
