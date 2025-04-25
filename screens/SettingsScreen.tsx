import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function SettingsScreen() {
  const { user, logout } = useAuth();

  return (
    <View className="flex-1 bg-white p-6">
      <View className="items-center mb-5">
        <Text className="text-2xl font-bold text-gray-800 mb-2">Profile</Text>
        <Text className="text-lg text-gray-600">{user?.name}</Text>
        <Text className="text-gray-500">{user?.email}</Text>
      </View>
      <View className="mt-5">
        <TouchableOpacity
          className="bg-red-500 py-3 px-4 rounded-lg items-center"
          onPress={logout}
        >
          <Text className="text-white font-bold text-lg">Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}