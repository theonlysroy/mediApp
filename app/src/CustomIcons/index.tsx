import React from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import type {IconProps} from 'react-native-vector-icons/Icon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

interface CustomIconProps extends Omit<IconProps, 'name'> {
  size?: number;
  color?: string;
}
export type CustomIcon = CustomIconProps;

export const StethoscopeIcon: React.FC<CustomIconProps> = ({
  size = 80,
  color = '#2563eb',
  ...props
}) => <FontAwesome6 name="stethoscope" size={size} color={color} {...props} />;

export const UserIcon: React.FC<CustomIconProps> = ({
  size = 40,
  color = '#2563eb',
  ...props
}) => <FontAwesome6 name={'user'} size={size} color={color} {...props} />;

export const MailIcon: React.FC<CustomIconProps> = ({
  size = 40,
  color = '#2563eb',
  ...props
}) => <Ionicons name={'mail'} size={size} color={color} {...props} />;

export const HomeIcon: React.FC<CustomIconProps> = ({
  size = 40,
  color = '#2563eb',
  ...props
}) => <Ionicons name={'home'} size={size} color={color} {...props} />;

export const LockIcon: React.FC<CustomIconProps> = ({
  size = 40,
  color = '#2563eb',
  ...props
}) => <FontAwesome6 name={'lock'} size={size} color={color} {...props} />;

export const CirclePlusIcon: React.FC<CustomIconProps> = ({
  size = 40,
  color = '#2563eb',
  ...props
}) => (
  <FontAwesome6 name={'circle-plus'} size={size} color={color} {...props} />
);

export const BellIcon: React.FC<CustomIconProps> = ({
  size = 40,
  color = '#2563eb',
  ...props
}) => <FontAwesome6 name={'bell'} size={size} color={color} solid {...props} />;

export const ShieldIcon: React.FC<CustomIconProps> = ({
  size = 40,
  color = '#2563eb',
  ...props
}) => (
  <FontAwesome6 name={'shield-halved'} size={size} color={color} {...props} />
);

export const SettingsIcon: React.FC<CustomIconProps> = ({
  size = 40,
  color = '#2563eb',
  ...props
}) => <Ionicons name={'settings'} size={size} color={color} {...props} />;

export const HelpCircleIcon: React.FC<CustomIconProps> = ({
  size = 40,
  color = '#2563eb',
  ...props
}) => <Entypo name={'help-with-circle'} size={size} color={color} {...props} />;

export const HelpCircleIcon2: React.FC<CustomIconProps> = ({
  size = 40,
  color = '#2563eb',
  ...props
}) => <Ionicons name={'help-circle'} size={size} color={color} {...props} />;

export const LogoutIcon: React.FC<CustomIconProps> = ({
  size = 40,
  color = '#2563eb',
  ...props
}) => <AntDesign name={'logout'} size={size} color={color} {...props} />;

export const PillIcon: React.FC<CustomIconProps> = ({
  size = 40,
  color = '#2563eb',
  ...props
}) => <FontAwesome6 name={'pills'} size={size} color={color} {...props} />;

export const AlertCircleIcon: React.FC<CustomIconProps> = ({
  size = 40,
  color = '#2563eb',
  ...props
}) => <Ionicons name={'alert-circle'} size={size} color={color} {...props} />;

export const SyringeIcon: React.FC<CustomIconProps> = ({
  size = 40,
  color = '#2563eb',
  ...props
}) => <FontAwesome6 name={'syringe'} size={size} color={color} {...props} />;
