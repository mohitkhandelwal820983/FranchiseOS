/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */


import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import ForgotPassword from './src/auth/ForgotPassword';
import Dashboard from './src/roles/superadmin/Dashboard';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
 

  return (
    <View style={styles.container}>
      {/* <SplashScreen/> */}
      {/* <LoginScreen/> */}
      {/* <ForgotPassword/> */}
      <Dashboard/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white',
  },
});

export default App;
