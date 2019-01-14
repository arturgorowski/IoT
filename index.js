import {Navigation} from "react-native-navigation";
import {registerScreens} from './screens/';

registerScreens();



Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setDefaultOptions({
    layout: {
      orientation: ['portrait']
    },
    topBar: {
      elevation: 0,
      visible: true,
      drawBehind: false,
      animate: false,
      buttonColor: 'white',
      title: {
        color: 'black',
        alignment: 'center',
        fontSize: 32
      },
      background: {
        color: 'transparent',
      },
    }
  });    
  Navigation.setRoot({
    root: {
      // sideMenu: {
      //   center: {
      //     stack: {
      //       id: 'MAIN_STACK',
      //       children: [
      //         {
      //           component: {
      //             name: 'Devices',
      //             options: {
      //               topBar: {
      //                 title: {
      //                   text: "Devices"
      //                 }
      //               }
      //             }
      //           }
      //         },
      //       ]
      //     }
      //   }
      // },
      bottomTabs: {
        children: [{
          component: {
            name: 'Devices',
            options: {
              bottomTab: {
                text: 'Devices',
                icon: require('./assets/images/iot.png')
              }
            }
          }
        },
        {
          component: {
            name: 'Connect',
            options: {
              bottomTab: {
                text: 'Connect',
                icon: require('./assets/images/ble.png')
              }
            }
          }
        }]
      }
    }
  });

});
