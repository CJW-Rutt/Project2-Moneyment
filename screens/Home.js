import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Appearance, useColorScheme } from 'react-native';
import { useState } from 'react';
import userAvatar from '../assets/images/sampleAvatar.png'

import User from '../components/atoms/Avatar';
import IconContainer from '../components/atoms/IconContainer';

export default function Home({ navigation }) {
    const colorScheme = useColorScheme();

    const themeTextStyle = colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText;
    const themeContainerStyle =
        colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;

    return (
        <View style={[styles.container, themeContainerStyle]}>
            <Text style={[styles.text, themeTextStyle]}>Your current theme is: {colorScheme}</Text>
            <StatusBar style="auto" />
            {/* <Button
                title="Go to about page"
                onPress={() => navigation.push('About')}
            /> */}
            {/* <User size='xs' url={userAvatar} /> */}
            <IconContainer type='calendar' size='xs' colour='orange' />
            <IconContainer type='plus' size='xs' colour='darkGreen' />
            <IconContainer type='fruits' size='xl' colour='mango' />



        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    lightContainer: {
        backgroundColor: '#d0d0c0',
    },
    darkContainer: {
        backgroundColor: '#242c40',
    },
    lightThemeText: {
        color: '#242c40',
    },
    darkThemeText: {
        color: '#d0d0c0',
    },
});

