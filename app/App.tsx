import {NavigationContainer} from '@react-navigation/native';
import {FC} from 'react';
import RootNavigator from './src/navigation/RootNavigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StatusBar} from 'react-native';

const App: FC = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#ffffff'} />
    </SafeAreaProvider>
  );
};

export default App;
