import BudgetDropdown from "../../atoms/BudgetDropdown";
import React, { useState, useContext } from 'react';
import { StyleSheet, View, ScrollView, TextInput } from "react-native";
import SaveButton from "../../atoms/SaveButton";
import { Image } from "expo-image";
import { DarkModeContext } from '../../../context/darkMode';
import { Text } from "react-native-paper";
import { useTheme } from "react-native-paper";
import { collection, getFirestore, addDoc, doc, updateDoc } from "firebase/firestore";


export default function BudgetForm({ budgetData, onSave, closeModal, onClose }) {
    console.log('BUDGET DATA: ', budgetData)

    const theme = useTheme()
    const { isDarkMode } = useContext(DarkModeContext);

    const [budgetTitle, setBudgetTitle] = useState(budgetData?.budgetTitle || '');
    const [budgetCategory, setBudgetCategory] = useState(budgetData?.budgetCategory || '');
    const [totalBudget, setTotalBudget] = useState(budgetData?.totalBudget?.toString() || '');

    const isEditMode = budgetData && budgetData.id;

    const addBudget = async (budgetDetails) => {
        const db = getFirestore();
        const budgetCollectionRef = collection(db, 'budgets');
        await addDoc(budgetCollectionRef, budgetDetails);
    };

    const updateBudget = async (id, budgetDetails) => {
        const db = getFirestore();
        const budgetDocRef = doc(db, 'budgets', id);
        await updateDoc(budgetDocRef, budgetDetails);
    };

    const handleSave = async () => {
        const budgetDetails = {
            name: budgetTitle,
            amount: parseFloat(totalBudget) || 0,
        };

        try {
            if (isEditMode) {
                await updateBudget(budgetData.id, budgetDetails);
            } else {
                await addBudget(budgetDetails);
            }
            closeModal();
        } catch (error) {
            console.error("Error saving budget:", error);
        }
    };

    return (
        <View style={[styles.mainContainer, { backgroundColor: theme.colors.background }]}>
            <View style={styles.inputContainer}>
                <Text style={styles.title}>General Information</Text>
                <TextInput
                    style={[styles.input, { borderColor: theme.colors.primaryLight }]}
                    placeholder="Budget Title"
                    placeholderTextColor={theme.colors.primaryLight}
                    value={budgetTitle}
                    onChangeText={setBudgetTitle}
                />
                <TextInput
                    style={[styles.input, { borderColor: theme.colors.primaryLight }]}
                    placeholder="Total Budget"
                    placeholderTextColor={theme.colors.primaryLight}
                    value={totalBudget}
                    keyboardType="numeric"
                    onChangeText={setTotalBudget}
                />
            </View>
            <View style={styles.dropdownContainer}>
                <View style={styles.row}>
                    <Text style={styles.title}>Recurrence</Text>
                </View>
                <BudgetDropdown />
            </View>
            {
                isDarkMode
                    ? <Image source={require("../../../assets/graphics/people/chillingDark.png")} alt='' style={{ width: 292, height: 186 }} contentFit="contain" />
                    : <Image source={require("../../../assets/graphics/people/chilling.png")} alt='' style={{ width: 292, height: 186 }} contentFit="contain" />
            }
            <SaveButton  onSave={handleSave} onPress={onClose} />
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    row: {
        flexDirection: "row",
        paddingRight: 10,
        alignItems: "center",
    },
    inputContainer: {
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10,
        borderColor: "#A9A9A9"
    },
    title: {
        paddingLeft: 14,
        paddingTop: 10,
        fontSize: 18,
        fontWeight: "600",
        paddingBottom: 10,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});