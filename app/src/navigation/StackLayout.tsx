import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ShowMedicineScreen from '../screens/ShowMedicine';
import ShowAllergiesScreen from '../screens/ShowAllergies';
import ShowPastSurgeriesScreen from '../screens/ShowPastSurgeries';
import HomeScreen from '../screens/Home';

export type HomeStackParamsList = {
  Dashboard: undefined;
  Medicine: undefined;
  Allergies: undefined;
  PastSurgeries: undefined;
};

const HomeStack = createNativeStackNavigator<HomeStackParamsList>();

export default function StackLayout() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        animation: 'slide_from_right',
      }}>
      <HomeStack.Screen name="Dashboard" component={HomeScreen} options={{}} />
      <HomeStack.Screen name="Medicine" component={ShowMedicineScreen} />
      <HomeStack.Screen name="Allergies" component={ShowAllergiesScreen} />
      <HomeStack.Screen
        name="PastSurgeries"
        component={ShowPastSurgeriesScreen}
      />
    </HomeStack.Navigator>
  );
}
