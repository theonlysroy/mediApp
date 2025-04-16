import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {FC, Fragment} from 'react';
// import SplashScreen from '../screens/SplashScreen';
// import AuthScreen from '../screens/Login';
import SignupScreen from '../screens/Signup';
import LoginScreen from '../screens/Login';
import TabLayout from './TabLayout';
import {useAuth} from '../contexts/Auth';

export type RootStackParamsList = {
  Splash?: undefined;
  Login: undefined;
  Signup: undefined;
  Dashboard: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamsList>();

const RootNavigator: FC = () => {
  const {token} = useAuth();
  console.log('token ==>', token);
  return (
    <Stack.Navigator>
      {token === null ? (
        <Fragment>
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
        </Fragment>
      ) : (
        <Stack.Screen
          name="Dashboard"
          component={TabLayout}
          options={{
            headerShown: false,
          }}
        />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
