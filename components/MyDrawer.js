import Home from './Home';
import Settings from './Settings';
import { createDrawerNavigator } from '@react-navigation/drawer';
import WelcomePage from './WelcomePage';
const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  return (
    <Drawer.Navigator >
      <Drawer.Screen name="Home" component={Home} options={{
        headerStyle:{
          backgroundColor:'#e8effa',
        },
        headerTitleStyle: {
          color: 'black',
          justifyContent: 'center'        
        }
      }}/>
      <Drawer.Screen name="Settings" component={Settings} options={{
        headerStyle:{
          backgroundColor:'#e8effa',
        },
        headerTitleStyle: {
          color: 'black',
          justifyContent: 'center'        
        }
      }}/>
      <Drawer.Screen name="Log Out" component={WelcomePage} options={{headerShown: false}} />
    </Drawer.Navigator>
  );
}

export default MyDrawer;
