import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { useAuth } from '@/providers/AuthProvider';

export default function Profile() {
  const { user, signOut } = useAuth();

  return (
    <View style={styles.container}>
      <Text h4 style={styles.title}>Profile</Text>
      <Text style={styles.email}>{user?.email}</Text>
      <Button
        title="Sign Out"
        onPress={signOut}
        containerStyle={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginBottom: 20,
  },
  email: {
    fontSize: 16,
    marginBottom: 30,
  },
  button: {
    width: '100%',
  },
});