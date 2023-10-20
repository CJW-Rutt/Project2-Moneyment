import { View, TextInput, StyleSheet } from 'react-native';
import { useState } from 'react';

const InputField = () => {
    const [text, onChangeText] = useState('');
    const [number, onChangeNumber] = useState('');

    return (
        <View>
            <TextInput>
                <Text>Budget Name</Text>
                style={styles.input}
                onChangeText={onChangeText}
                label="Budget Name"
                value={text}
            </TextInput>
            <TextInput>
                <Text>Budget Name</Text>
                style={styles.input}
                onChangeText={onChangeNumber}
                value=('$'{number})
                keyboardType="numeric"
            </TextInput>
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});

export default InputField;