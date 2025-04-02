import {FC} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from 'react-native';
import {View} from 'react-native';

const NotFound: FC = ({}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.notFoundText}>404 Page Not Found</Text>
      <TouchableOpacity>
        <Text>Go to home !</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFoundText: {
    fontSize: 50,
    fontWeight: 'bold',
    fontFamily: 'Arial',
  },
});

export default NotFound;
