import {NavigationContainer} from '@react-navigation/native';
import {FC} from 'react';
import RootNavigator from './src/navigation/RootNavigator';
import BootSplash from 'react-native-bootsplash';

const App: FC = () => {
  return (
    <NavigationContainer onReady={() => BootSplash.hide({fade: true})}>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default App;
