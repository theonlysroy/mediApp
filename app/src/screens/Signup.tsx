import {Text, TouchableOpacity} from 'react-native';
import {Platform, View} from 'react-native';
import {KeyboardAvoidingView} from 'react-native';
import {CalendarIcon, LockIcon, MailIcon, UserIcon} from '../CustomIcons';
import {TextInput} from 'react-native';
import {authStyles as styles} from '../styles/authStyles';
import {useState} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamsList} from '../navigation/RootNavigator';
import {Alert} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {validateInputs} from '../lib/helpers';

type SignupScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamsList,
  'Signup'
>;

interface SignupScreenProps {
  navigation: SignupScreenNavigationProp;
}

type SignupDataType = {
  email: string;
  password: string;
  fullName: string;
  dob: Date | null;
};
const SignupScreen: React.FC<SignupScreenProps> = ({navigation}) => {
  const [signupData, setSignupData] = useState<SignupDataType>({
    fullName: '',
    email: '',
    password: '',
    dob: null,
  });
  const [open, setOpen] = useState(false);

  const handleInputChange = newValue => {
    console.log(newValue);
  };

  const handleSubmit = () => {
    if (!validateInputs(signupData)) {
      Alert.alert('Please fill up all details');
      return;
    }
    console.log('signup data ==>', signupData);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>
          Sign up to start tracking your health
        </Text>

        <View style={styles.inputContainer}>
          <UserIcon size={20} color="#64748b" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor={'#1e293b'}
            value={signupData.fullName}
            onChangeText={text =>
              setSignupData(prev => ({...prev, fullName: text}))
            }
            autoCapitalize="words"
          />
        </View>

        <View style={styles.inputContainer}>
          <MailIcon size={20} color="#64748b" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={'#1e293b'}
            value={signupData.email}
            onChangeText={text =>
              setSignupData(prev => ({...prev, email: text}))
            }
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
            value={signupData.password}
            onChangeText={text =>
              setSignupData(prev => ({...prev, password: text}))
            }
            secureTextEntry
          />
        </View>

        <View style={styles.inputContainer}>
          <CalendarIcon size={20} color="#64748b" style={styles.inputIcon} />
          <TouchableOpacity style={styles.input} onPress={() => setOpen(true)}>
            <Text style={styles.inputText}>
              {signupData.dob
                ? signupData.dob.toLocaleDateString()
                : 'Date of birth'}
            </Text>
          </TouchableOpacity>
          <DatePicker
            modal
            open={open}
            date={signupData.dob ?? new Date(1970, 0, 1)}
            mode="date"
            maximumDate={new Date()}
            onConfirm={selectedDate => {
              setOpen(false);
              setSignupData(prev => ({...prev, dob: selectedDate}));
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.switchButton}
          onPress={() => navigation.replace('Login')}>
          <Text style={styles.switchText}>
            Already have an account? Sign In
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;
