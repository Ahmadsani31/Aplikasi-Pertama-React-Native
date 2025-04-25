import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';
import { Camera, CameraType, CameraView } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { MaterialIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');
const SCAN_SIZE = width * 0.5;
const SCAN_PADDING = 20;

export default function BarcodeScanner({ onScan, onClose }: {
  onScan: (data: string) => void;
  onClose: () => void;
}) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const scanLinePos = useRef(new Animated.Value(0)).current;

  // Animasi garis scan
  useEffect(() => {
    const animateScanLine = () => {
      scanLinePos.setValue(0);
      Animated.loop(
        Animated.timing(scanLinePos, {
          toValue: SCAN_SIZE,
          duration: 2000,
          useNativeDriver: true,
        })
      ).start();
    };

    animateScanLine();
  }, []);

  // Permission kamera
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    setScanned(true);
    onScan(data);
  };

  if (hasPermission === null) {
    return <View style={styles.permissionContainer}><Text>Requesting camera permission...</Text></View>;
  }

  if (hasPermission === false) {
    return <View style={styles.permissionContainer}><Text>No camera access</Text></View>;
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
      facing='back'
      barcodeScannerSettings={{
        barcodeTypes: ["qr"],
      }}
      onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}>
        {/* Overlay Hitam Transparan */}
        <View style={styles.overlay}>
          {/* Area Transparan di Atas Frame Scan */}
          <View style={[styles.overlaySection, { height: (height - SCAN_SIZE) / 10 - SCAN_PADDING }]} />
          
          {/* Baris Tengah (Frame Scan) */}
          <View style={styles.middleRow}>
            {/* Area Transparan di Kiri Frame */}
            <View style={[styles.overlaySection, { width: (width - SCAN_SIZE) / 2.5 - SCAN_PADDING }]} />
            
            {/* Frame Scanner */}
            <View style={styles.scanFrame}>
              {/* Corner Borders */}
              <View style={[styles.corner, styles.cornerTopLeft]} />
              <View style={[styles.corner, styles.cornerTopRight]} />
              <View style={[styles.corner, styles.cornerBottomLeft]} />
              <View style={[styles.corner, styles.cornerBottomRight]} />
              
              {/* Animated Scan Line */}
              <Animated.View 
                style={[
                  styles.scanLine,
                  {
                    transform: [{
                      translateY: scanLinePos.interpolate({
                        inputRange: [0, SCAN_SIZE],
                        outputRange: [0, SCAN_SIZE]
                      })
                    }]
                  }
                ]}
              />
            </View>
            
            {/* Area Transparan di Kanan Frame */}
            <View style={[styles.overlaySection, { width: (width - SCAN_SIZE) / 2 - SCAN_PADDING }]} />
          </View>
          
          {/* Area Transparan di Bawah Frame Scan */}
          <View style={[styles.overlaySection, { height: (height - SCAN_SIZE) / 2 - SCAN_PADDING }]} />
        </View>

        {/* Text Instruksi */}
        <Text style={styles.instructionText}>Arahkan kamera ke barcode/QR code</Text>
        
        {/* Tombol Close */}
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <MaterialIcons name="close" size={30} color="white" />
        </TouchableOpacity>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height:330,
    backgroundColor: 'black',
    borderRadius:20
  },
  camera: {
    flex: 1,
    borderRadius:10
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  overlay: {
    flex: 1,
  },
  overlaySection: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Hitam transparan 50%
  },
  middleRow: {
    flexDirection: 'row',
    height: SCAN_SIZE + SCAN_PADDING * 2,
  },
  scanFrame: {
    width: SCAN_SIZE,
    height: SCAN_SIZE,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    backgroundColor: 'transparent',
    position: 'relative',
    margin: SCAN_PADDING,
  },
  corner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: '#3B82F6',
  },
  cornerTopLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 3,
    borderLeftWidth: 3,
  },
  cornerTopRight: {
    top: 0,
    right: 0,
    borderTopWidth: 3,
    borderRightWidth: 3,
  },
  cornerBottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
  },
  cornerBottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 3,
    borderRightWidth: 3,
  },
  scanLine: {
    position: 'absolute',
    width: SCAN_SIZE - 10,
    left: 5,
    height: 2,
    backgroundColor: '#3B82F6',
  },
  instructionText: {
    position: 'absolute',
    top: 10,
    alignSelf: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255, 0, 0, 0.7)',
    borderRadius: 50,
    padding: 5,
  },
});