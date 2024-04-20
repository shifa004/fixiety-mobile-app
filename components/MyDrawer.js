import Forum from './Forum';
import Home from './Home';
import { createDrawerNavigator } from '@react-navigation/drawer';
import JournalCalendar from './JournalCalendar';

const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} />
      {/* <Drawer.Screen name="Journal" component={JournalCalendar} />
      <Drawer.Screen name="Forum" component={Forum} /> */}
    </Drawer.Navigator>
  );
}

export default MyDrawer;
