import React, { useState } from 'react';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';
import Button from 'components/Button';
import { Overlay } from 'components/Overlay';
import BarcodeScanner from 'components/BarcodeScanner';
import { MaterialIcons } from '@expo/vector-icons';
import { toast } from '@backpackapp-io/react-native-toast';

export default function HomeScreen() {
  const { user, logout } = useAuth();

  const [showScanner, setShowScanner] = useState(false);
  const [scannedData, setScannedData] = useState<string | null>(null);

  const handleScan = (data: string) => {
    setScannedData(data);
    setShowScanner(false);
    toast('Scan Success', {
      onPress: () => {
        console.log('Toast pressed!');
      },
    });
    Alert.alert('Scan Success', `Scanned data: ${data}`, [
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);
  };

  return (
    <View className="flex-1 bg-white p-6">
      {showScanner ? (
        <BarcodeScanner
          onScan={handleScan}
          onClose={() => setShowScanner(false)}
        />
      ) : (
        <View className="mb-10">

          {scannedData && (
            <View className="bg-white rounded-lg mb-6">
              <Text className="text-lg font-medium">Last Scanned:</Text>
              <Text className="text-blue-500 mt-1">{scannedData}</Text>
            </View>
          )}

          <TouchableOpacity
            onPress={() => setShowScanner(true)}
            className="flex-row items-center justify-center bg-blue-500 py-3 px-6 rounded-lg"
          >
            <MaterialIcons name="qr-code-scanner" size={24} color="white" />
            <Text className="text-white font-bold ml-2">Scan Barcode</Text>
          </TouchableOpacity>
        </View>
      )}


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
    borderRadius: 10
  },
  buttonContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 14,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});