import { View, TextInput, StyleSheet } from 'react-native';

const InputField = () => {
    const [text, onChangeText] = useState('');
    const [number, onChangeNumber] = useState('');

    return (
        <View>
            <TextInput>
                <Text>Budget Name</Text>
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
            </TextInput>
            <TextInput
                style={styles.input}
                onChangeText={onChangeNumber}
                value={number}
                placeholder="useless placeholder"
                keyboardType="numeric"
            />
        </View>
    );
};