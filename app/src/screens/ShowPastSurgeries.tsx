import {ScrollView, View, Text} from 'react-native';
import {homeScreenStyles as styles} from './common/homeScreenStyles';

const ShowPastSurgeriesScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>All Medicines</Text>
      </View>
    </ScrollView>
  );
};
export default ShowPastSurgeriesScreen;
