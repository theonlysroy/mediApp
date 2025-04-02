import React from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import type {IconProps} from 'react-native-vector-icons/Icon';
import Ionicons from 'react-native-vector-icons/Ionicons';

export interface CustomIconProps extends Omit<IconProps, 'name'> {
  size?: number;
  color?: string;
}

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

export const LockIcon: React.FC<CustomIconProps> = ({
  size = 40,
  color = '#2563eb',
  ...props
}) => <FontAwesome6 name={'lock'} size={size} color={color} {...props} />;
