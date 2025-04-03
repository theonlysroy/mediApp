import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home';
import AddMedicineScreen from '../screens/AddMedicine';
import ProfileScreen from '../screens/Profile';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import StackLayout from './StackLayout';

export type TabParamsList = {
  Home: undefined;
  Add: undefined;
  Profile: undefined;
};

const Tabs = createBottomTabNavigator<TabParamsList>();

const TabHomeIcon = ({size, color}: {size: number; color: string}) => (
  <Ionicons name="home" size={size} color={color} />
);

const TabAddRecordIcon = ({size, color}: {size: number; color: string}) => (
  <FontAwesome5 name="plus-circle" size={size} color={color} />
);

const TabProfileIcon = ({size, color}: {size: number; color: string}) => (
  <FontAwesome5 name="user" size={size} color={color} solid />
);

export default function TabLayout() {
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopColor: '#e2e8f0',
          height: 64,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: '#2563eb',
        tabBarInactiveTintColor: '#64748b',
        tabBarLabelStyle: {
          fontFamily: 'Arial',
          fontSize: 14,
        },
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTitleStyle: {
          fontFamily: 'Arial',
          fontWeight: 'semibold',
          color: '#1e293b',
        },
        animation: 'shift',
      }}>
      <Tabs.Screen
        name="Home"
        component={StackLayout}
        options={{
          headerShown: false,
          title: 'Dashboard',
          tabBarIcon: TabHomeIcon,
        }}
      />
      <Tabs.Screen
        name="Add"
        component={AddMedicineScreen}
        options={{
          title: 'Add Record',
          tabBarIcon: TabAddRecordIcon,
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: TabProfileIcon,
        }}
      />
    </Tabs.Navigator>
  );
}
