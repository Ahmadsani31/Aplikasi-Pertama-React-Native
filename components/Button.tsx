import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  variant?: 'primary' | 'secondary';
}

export default function Button({
  title,
  onPress,
  loading = false,
  variant = 'primary',
}: ButtonProps) {
  const bgColor = variant === 'primary' ? 'bg-blue-500' : 'bg-gray-200';
  const textColor = variant === 'primary' ? 'text-white' : 'text-gray-800';

  return (
    <TouchableOpacity
      className={`${bgColor} py-3 px-4 rounded-lg items-center justify-center`}
      onPress={onPress}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? 'white' : 'gray'} />
      ) : (
        <Text className={`${textColor} font-bold text-lg`}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}