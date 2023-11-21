import React, { createContext, useState, useContext, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider, useTheme } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useMaterial3Theme } from '@pchmn/expo-material3-theme';
import { useColorScheme } from 'react-native';
import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import { useFonts } from 'expo-font';
import { SIZES } from './constants';
import NavBar from './components/molecules/NavBar';
import { DarkModeContext, DarkModeProvider } from './context/darkMode';
import { RefreshProvider } from './utils/RefreshContext';

export default function App() {
  // const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const colorScheme = useColorScheme();
  const { theme } = useMaterial3Theme();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const paperTheme =
    isDarkMode
      ? {
        ...MD3DarkTheme, colors: {
          ...MD3DarkTheme.colors,
          primaryDark: '#212121',
          secondaryDark: '#323232',
          tertiaryDark: '#535353',
          primaryLight: '#CFCFCF',
          secondaryLight: '#E8E8E8',
          blue: '#95D6CD',
          primaryOrange: '#E98869',
          secondaryOrange: '#C35434'
        }, mode: 'exact', myOwnProperty: true
      }
      : { ...MD3LightTheme, colors: theme.light };

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    // Additional logic or side effects based on dark mode changes can be placed here
    // console.log('Dark Mode:', isDarkMode);
  }, [isDarkMode]);


  //FONTS
  const [fontsLoaded] = useFonts({
    'Montserrat': require('./assets/fonts/Montserrat-VariableFont_wght.ttf'),
  });
  // Check if fonts are loaded before rendering the app
  if (!fontsLoaded) {
    return null; // Or render a loading indicator
  }

  return (
    <RefreshProvider>
      <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
        <PaperProvider theme={paperTheme}>
          {/* <DarkModeProvider> */}
          <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView >
            </SafeAreaView>
            
              <NavBar />
          </GestureHandlerRootView>
          {/* </DarkModeProvider> */}
        </PaperProvider>
      </DarkModeContext.Provider>
      </RefreshProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: SIZES.height
  }
});