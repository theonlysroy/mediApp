import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {LockIcon, MailIcon} from '../CustomIcons';
import {RootStackParamsList} from '../navigation/RootNavigator';
import {authStyles as styles} from '../styles/authStyles';
import BootSplash from 'react-native-bootsplash';
import {Alert} from 'react-native';
import {useAuth} from '../contexts/Auth';

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamsList,
  'Login'
>;

interface LoginScreenProps {
  navigation: LoginScreenNavigationProp;
}

const LoginScreen: React.FC<LoginScreenProps> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {login} = useAuth();

  const handleSubmit = async () => {
    if (!email || !password) {
      Alert.alert('Please fill the form');
      return;
    }
    if (email === 'admin@admin.com' && password === 'Admin@123') {
      login('token');
      navigation.replace('Dashboard');
    } else {
      Alert.alert('Invalid credentials');
    }
    navigation.replace('Dashboard');
  };

  useEffect(() => {
    BootSplash.hide({fade: true});
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to access your records</Text>

        <View style={styles.inputContainer}>
          <MailIcon size={20} color="#64748b" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={'#1e293b'}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputContainer}>
          <LockIcon size={20} color="#64748b" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={'#1e293b'}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.switchButton}
          onPress={() => navigation.replace('Signup')}>
          <Text style={styles.switchText}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
