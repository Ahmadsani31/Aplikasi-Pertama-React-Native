import React from 'react';
import { View, Text } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function ProfileScreen() {
  const { user } = useAuth();

  return (
    <View className="flex-1 bg-white p-6">
      <Text className="text-2xl font-bold text-gray-800 mb-4">Profile</Text>
      <View className="bg-gray-100 p-4 rounded-lg">
        <Text className="text-lg font-medium text-gray-700">Name: {user?.name}</Text>
        <Text className="text-lg font-medium text-gray-700 mt-2">Email: {user?.email}</Text>
      </View>
    </View>
  );
}