import { View, TextInput, StyleSheet, Text } from "react-native"
import { useState } from "react"
import TransactionType from "../../atoms/TransactionType"
import SaveButton from "../../atoms/SaveButton"
import { addDoc, collection, getFirestore } from "firebase/firestore";

export default function AddTransactionForm({ initialValues = {}, onClose }) {
    const [store, setStore] = useState(initialValues.purchasePlace || '');
    const [price, setPrice] = useState(initialValues.totalAmount || '');
    const [transactionType, setTransactionType] = useState('');
    const [budget, setBudget] = useState(initialValues.purchaseType || '');

    const handleTransactionTypeSelect = (selectedType) => {
        setTransactionType(selectedType);
    };

    const handleSave = async () => {
        const db = getFirestore();

        const newTransaction = {
            store: store,
            date: date, // We need to update this 
            price: parseFloat(price),
            budget: budget,
            type: transactionType,
        };
    
        try {
            const docRef = await addDoc(collection(db, "transactions"), newTransaction);
            onClose();
            
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }; 

    const [date, setDate] = useState(formatDate(new Date()));

    return (
        <>
            <View style={styles.maincontainer}>
                <View style={styles.container}>
                    <Text style={styles.reviewText}>Review your Transaction</Text>
                    <Text style={styles.subText}>* required fields</Text>
                    <View>
                        <View style={styles.smallContainer}>
                            <Text>Store *</Text>
                            <TextInput
                                style={styles.input}
                                value={store}
                                onChangeText={text => setStore(text)}
                                placeholder="Store Name"
                            />
                        </View>
                        <View style={styles.rowContainer}>
                            <View style={styles.smallRowContainer}>
                                <Text>
                                    Date *
                                </Text>
                                <TextInput
                                    style={styles.inputShort}
                                    value={date}
                                    onChangeText={text => setDate(text)}
                                    placeholder="Date"
                                />
                            </View>
                            <View style={styles.smallRowContainer}>
                                <Text>
                                    Price *
                                </Text>
                                <TextInput
                                    style={styles.inputShort}
                                    value={price}
                                    onChangeText={price => setPrice(price)}
                                    placeholder="$5.00"
                                    keyboardType="numeric"
                                />
                            </View>
                        </View>
                        <View style={styles.smallContainer}>
                            <Text>
                                Transaction Type
                            </Text>
                            <TransactionType onTypeSelect={handleTransactionTypeSelect} />
                        </View>

                        <View style={styles.smallContainer}>
                            <Text>
                                Budget Name *
                            </Text>
                            <TextInput
                                style={styles.input}
                                value={budget}
                                onChangeText={text => setBudget(text)}
                                placeholder="Shopping"
                            />
                        </View>
                    </View>
                </View>
                <View>
                    <SaveButton onSave={handleSave} />
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
    },
    container: {
        paddingLeft: 30,
        paddingRight: 30,
        marginBottom: 30
    },
    smallContainer: {
        gap: 3,
        marginBottom: 10,
    },
    rowContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        gap: 10,
        marginBottom: 10,
    },
    smallRowContainer: {
        width: '48%',
        flexGrow: 1,
        gap: 3
    },
    input: {
        height: 35,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#707070',
        padding: 10,
        fontSize: 12,
        fontWeight: "400"
    },
    inputShort: {
        height: 35,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#707070',
        padding: 10,
        fontSize: 12,
        fontWeight: "400"
    },
    reviewText: {
        fontSize: 16,
        fontWeight: "700",
        paddingTop: 20,
        paddingBottom: 5
    },
    subText: {
        fontSize: 12,
        fontWeight: "400",
        paddingBottom: 15
    }
})