import React, { useState } from 'react';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { Overlay } from 'components/Overlay';
import BarcodeScanner from 'components/BarcodeScanner';
import { MaterialIcons } from '@expo/vector-icons';
import { toast } from '@backpackapp-io/react-native-toast';
import { Avatar, Button, Card, Text as TextCard } from 'react-native-paper';

export default function HomeScreen() {
  const { user, logout } = useAuth();


  const [showScanner, setShowScanner] = useState(false);
  const [scannedData, setScannedData] = useState<string | null>(null);

  const handleScan = (data: string) => {
    setScannedData(data);
    setShowScanner(false);
    toast.success('Barcode Scan Success')
    Alert.alert('Scan Success', `Scanned data: ${data}`, [
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);
  };

  const dataKiri = ['Data A1', 'Data A2', 'Data A3', 'Data B1', 'Data B2', 'Data B3'];
  const dataKanan = [];

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
      {/* <ScrollView className="my-4" contentContainerStyle={{ flexGrow: 1 }}>

        {dataKiri.map((item, index) => (
          <Card className='mb-3 p-2'>
            <Text className='font-bold text-center text-4xl'>Hello</Text>
            <View className='flex-row'>

              <View
                className="flex-1 bg-blue-100 p-2 m-2 rounded-xl"
              >
                <View
                  className="text-center">
                  <Text className="font-bold">Awal</Text>
                  <Text className="text-sm">
                    2020
                  </Text>
                  <Text className="text-sm">
                    Jam Pagi
                  </Text>
                  <Text className="text-sm font-bold">
                    Spidometer 100 Km
                  </Text>
                </View>
              </View>
              <View
                className="flex-1 bg-green-100 p-2 m-2 rounded-xl"
              >
                <View
                  className="text-center">
                  <Text className="font-bold">Awal</Text>
                  <Text className="text-sm">
                    2020
                  </Text>
                  <Text className="text-sm">
                    Jam Pagi
                  </Text>
                  <Text className="text-sm font-bold">
                    Spidometer 100 Km
                  </Text>
                </View>
              </View>
            </View>

          </Card>
        ))}
      </ScrollView> */}
      <View className='mt-5'>

        <Card onPress={() => console.log('onpress')}>
          <View className="flex-row items-center justify-between p-2 bg-gray-200 rounded-t-md">
            <Text className="text-sm text-gray-500">
              Tanggal
            </Text>

            <Button
              className="bg-[#3a0ca3] badge p-1 rounded text-white">
              Detail
            </Button>
          </View>
          <Card.Content>
            <View className='flex-row'>

              <View
                className="flex-1 bg-blue-100 p-2 m-2 rounded-xl"
              >
                <View
                  className="text-center">
                  <Text className="font-bold">Awal</Text>
                  <Text className="text-sm">
                    2020
                  </Text>
                  <Text className="text-sm">
                    Jam Pagi
                  </Text>
                  <Text className="text-sm font-bold">
                    Spidometer 100 Km
                  </Text>
                </View>
              </View>
              <View
                className="flex-1 bg-green-100 p-2 m-2 rounded-xl"
              >
                <View
                  className="text-center">
                  <Text className="font-bold">Awal</Text>
                  <Text className="text-sm">
                    2020
                  </Text>
                  <Text className="text-sm">
                    Jam Pagi
                  </Text>
                  <Text className="text-sm font-bold">
                    Spidometer 100 Km
                  </Text>
                </View>
              </View>
            </View>
          </Card.Content>
        </Card>
      </View>

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