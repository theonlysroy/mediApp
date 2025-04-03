import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {FC} from 'react';
// import SplashScreen from '../screens/SplashScreen';
// import AuthScreen from '../screens/Login';
import SignupScreen from '../screens/Signup';
import LoginScreen from '../screens/Login';
import TabLayout from './TabLayout';

export type RootStackParamsList = {
  Splash?: undefined;
  Login: undefined;
  Signup: undefined;
  Dashboard: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamsList>();

const RootNavigator: FC = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      {/* <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{
          headerShown: false,
        }}
      /> */}
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="Dashboard"
        component={TabLayout}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
