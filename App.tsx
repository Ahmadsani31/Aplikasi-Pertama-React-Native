import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './context/AuthContext';
import AppNavigator from './navigation/AppNavigator';
import { Toasts } from '@backpackapp-io/react-native-toast';

import './global.css';
import { Easing, StyleSheet } from 'react-native';

export default function App() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
      <AuthProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <AppNavigator />
          <Toasts  globalAnimationType="spring" globalAnimationConfig={{duration: 500, flingPositionReturnDuration: 200, easing: Easing.elastic(1)}}/>
        </NavigationContainer>
      </AuthProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'red'
  },
});