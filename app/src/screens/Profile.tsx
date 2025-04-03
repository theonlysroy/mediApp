import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {
  BellIcon,
  HelpCircleIcon,
  LogoutIcon,
  SettingsIcon,
  ShieldIcon,
} from '../CustomIcons';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {TabParamsList} from '../navigation/TabLayout';

type ProfileScreenNavigationProp = BottomTabNavigationProp<
  TabParamsList,
  'Profile'
>;

interface ProfileScreenProps {
  navigation: ProfileScreenNavigationProp;
}

const ProfileScreen: React.FC<ProfileScreenProps> = () => {
  const menuItems = [
    {icon: BellIcon, title: 'Notifications', color: '#2563eb'},
    {icon: ShieldIcon, title: 'Privacy', color: '#2563eb'},
    {icon: SettingsIcon, title: 'Settings', color: '#2563eb'},
    {icon: HelpCircleIcon, title: 'Help & Support', color: '#2563eb'},
    {icon: LogoutIcon, title: 'Logout', color: '#ef4444'},
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/profile_pic.jpeg')}
          style={styles.avatar}
        />
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.email}>john.doe@example.com</Text>
      </View>

      <View style={styles.menu}>
        {menuItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem}>
            <item.icon size={24} color={item.color} />
            <Text
              style={[
                styles.menuText,
                item.color === '#ef4444' && styles.logoutText,
              ]}>
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
  },
  menu: {
    padding: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  menuText: {
    marginLeft: 16,
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#1e293b',
  },
  logoutText: {
    color: '#ef4444',
  },
});

export default ProfileScreen;
