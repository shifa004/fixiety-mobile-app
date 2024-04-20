import Forum from './Forum';
import Home from './Home';
import Journal from './Journal';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Profile" component={Journal} />
      <Drawer.Screen name="Settings" component={Forum} />
    </Drawer.Navigator>
  );
}

export default MyDrawer;
