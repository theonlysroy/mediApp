import {NavigationContainer} from '@react-navigation/native';
import {FC} from 'react';
import RootNavigator from './src/navigation/RootNavigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StatusBar} from 'react-native';
import AuthProvider from './src/contexts/Auth';

const App: FC = () => {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
        <StatusBar barStyle={'dark-content'} backgroundColor={'#ffffff'} />
      </AuthProvider>
    </SafeAreaProvider>
  );
};

export default App;
