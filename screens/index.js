import {Navigation} from 'react-native-navigation';

import Connect from './Connect';
import Devices from './Devices';
import Creatingdevice from './Creatingdevice';
import Pickingcolor from './Pickingcolor';

export function registerScreens() {
    Navigation.registerComponent(`Connect`, () => Connect);
    Navigation.registerComponent(`Devices`, () => Devices);
    Navigation.registerComponent(`Creatingdevice`, () => Creatingdevice);
    Navigation.registerComponent(`Pickingcolor`, () => Pickingcolor);
}
