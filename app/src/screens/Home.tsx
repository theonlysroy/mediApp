import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  AlertCircleIcon,
  CustomIcon,
  PillIcon,
  SyringeIcon,
} from '../CustomIcons';
import {HomeStackParamsList} from '../navigation/StackLayout';

type HomeScreenNavigationProp = BottomTabNavigationProp<
  HomeStackParamsList,
  'Dashboard'
>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

interface Record {
  title: string;
  icon: React.ComponentType<CustomIcon>;
  route: keyof HomeStackParamsList;
  count: number;
}

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const records: Record[] = [
    {title: 'Medicine Usage', icon: PillIcon, route: 'Medicine', count: 3},
    {title: 'Allergies', icon: AlertCircleIcon, route: 'Allergies', count: 2},
    {
      title: 'Past Surgeries',
      icon: SyringeIcon,
      route: 'PastSurgeries',
      count: 1,
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello, John</Text>
        <Text style={styles.subtitle}>
          View and manage your medical records
        </Text>
      </View>

      <View style={styles.grid}>
        {records.map((record, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => navigation.navigate(record.route)}>
            <record.icon size={24} color="#2563eb" />
            <Text style={styles.cardTitle}>{record.title}</Text>
            <Text style={styles.cardCount}>{record.count} records</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 24,
    backgroundColor: '#fff',
  },
  greeting: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
  },
  grid: {
    padding: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  card: {
    width: '47%',
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginTop: 12,
    marginBottom: 4,
  },
  cardCount: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
  },
});

export default HomeScreen;
