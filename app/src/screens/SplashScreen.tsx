import {SafeAreaView} from 'react-native';
// import {StethoscopeIcon} from '../CustomIcons';
import {StyleSheet} from 'react-native';
import {FC, useEffect} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamsList} from '../navigation/RootNavigator';
import {Image} from 'react-native';

type SplashScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamsList,
  'Splash'
>;

interface SplashScreenProps {
  navigation: SplashScreenNavigationProp;
}

const SplashScreen: FC<SplashScreenProps> = ({navigation}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Auth');
    }, 3000);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../assets/app_logo.png')}
        style={styles.splashImage}
      />
      {/* <StethoscopeIcon /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  splashImage: {
    width: '50%',
    height: '50%',
    resizeMode: 'contain',
  },
});

export default SplashScreen;
