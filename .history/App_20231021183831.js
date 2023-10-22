import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout } from '@ui-kitten/components';

import NavBar from './components/molecules/NavBar';
import Icon from 'react-native-vector-icons/FontAwesome'

Icon.loadFont();

export default function App() {

  const [fontsLoaded] = useFonts({
    'Montserrat': require('./assets/fonts/Montserrat-VariableFont_wght.ttf'),
  });

  return (
    <ApplicationProvider>
      <PaperProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <NavigationContainer>
            <NavBar />
          </NavigationContainer>
        </SafeAreaView>
      </PaperProvider>
    </ApplicationProvider>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});