import {Navigation} from 'react-native-navigation';

import Connect from './Connect';
import Devices from './Devices';
import NewDevice from './NewDevice';
import PickingColor from './PickingColor';
import EditDelete from './EditDelete';

export function registerScreens() {
    Navigation.registerComponent(`Connect`, () => Connect);
    Navigation.registerComponent(`Devices`, () => Devices);
    Navigation.registerComponent(`NewDevice`, () => NewDevice);
    Navigation.registerComponent(`PickingColor`, () => PickingColor);
    Navigation.registerComponent(`EditDelete`, () => EditDelete);
}
