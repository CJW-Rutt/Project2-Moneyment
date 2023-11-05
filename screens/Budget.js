import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Modal, useColorScheme, Pressable } from 'react-native';
import { useState } from 'react';
import { Image } from 'expo-image';
import Icon from 'react-native-vector-icons/FontAwesome5'

import BudgetSingle from '../components/organisms/Budget/BudgetSingle';
import BudgetCard from '../components/molecules/BudgetCard';
import ManageBudgetCard from '../components/molecules/ManageBudgetCard';
import BudgetSingleTemplate from '../components/templates/Budget/BudgetSingleTemplate';
import { ScrollView } from 'react-native-gesture-handler';

export default function Budget({ navigation }) {
    const [budgets, setBudgets] = useState([
        {
            budgetTitle: "Coffee",
            budgetCategory: "Coffee",
            totalPrice: 50.45,
            totalBudget: 500.00
        },
        {
            budgetTitle: "Food",
            budgetCategory: "Food",
            totalPrice: 578.00,
            totalBudget: 1500.00
        },
        {
            budgetTitle: "Cheese",
            budgetCategory: "Cheese",
            totalPrice: 1570.00,
            totalBudget: 5000.00
        },
        {
            budgetTitle: "Wine",
            budgetCategory: "Wine",
            totalPrice: 4570.00,
            totalBudget: 5000.00
        },
    ]);

    const totalBudgetSum = budgets.reduce((acc, budget) => acc + budget.totalBudget, 0);
    const totalPriceSum = budgets.reduce((acc, budget) => acc + budget.totalPrice, 0);
    const remainingBudget = totalBudgetSum - totalPriceSum;

    const calculateProgress = (totalBudget, totalPrice) => {
        const budget = parseFloat(totalBudget);
        const spent = parseFloat(totalPrice);
        return spent / budget;
    };

    const [activeModalIndex, setActiveModalIndex] = useState(null);

    const openModal = (index) => {
        setActiveModalIndex(index);
    };

    const closeModal = () => {
        setActiveModalIndex(null);
    };

    const addBudget = (newBudget) => {
        setBudgets([...budgets, newBudget]);
    };

    return (

            <View style={styles.container}>
                <Text style={styles.title}>Smart Budgeting</Text>
                <Text style={styles.desc}>Visualize your budgets and analyze your remaining spending within specific timeframes</Text>
                <ManageBudgetCard 
                    onAddBudget={addBudget}  
                    totalBudget={totalBudgetSum} 
                    remainingBudget={remainingBudget} 
                />
                <ScrollView>
                    { budgets.map((budgetItem, index) => (
                        <View key={index}>
                            <BudgetCard             
                                budget={{
                                    budgetTitle: budgetItem.budgetTitle,
                                    totalBudget: budgetItem.totalBudget,
                                    totalPrice: budgetItem.totalPrice,
                                    progress: calculateProgress(budgetItem.totalBudget, budgetItem.totalPrice),

                                }}
                                onPress={() => openModal(index)}
                            />
                            {/* Modal Popup - Budget Single */}
                            <Modal
                                animationType="slide"
                                transparent={false}
                                visible={activeModalIndex === index}
                                onRequestClose={closeModal}
                            >
                                <View style={styles.modalContainer}>
                                    <View style={styles.modalHeader}>
                                        <Pressable style={styles.closeButton} onPress={closeModal}>
                                            <Icon name='arrow-left' size={25} color='#000' />
                                        </Pressable>
                                        <Text style={styles.headerTitle}>{budgetItem.budgetTitle}</Text>
                                    </View>
                                    <BudgetSingleTemplate                                
                                        budget={{
                                        budgetTitle: budgetItem.budgetTitle,
                                        totalBudget: budgetItem.totalBudget,
                                        totalPrice: budgetItem.totalPrice,
                                        progress: calculateProgress(budgetItem.totalBudget, budgetItem.totalPrice),

                                    }} />
                                </View>
                            </Modal>
                        </View>
                    ))}
                </ScrollView>
                <StatusBar />
            </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    title: {
        fontSize: 18,
        maxWidth: 355,
        fontWeight: 'bold',
        alignItems: 'flex-start',
        width: '100%',
        marginTop: 10,
    },
    desc: {
        fontSize: 12,
        marginTop: 10,
        maxWidth: 355,
        width: '100%',
    },
    modalContainer: {
        flex: 1, 
    },
    modalHeader:{
        flex: 1,
        flexDirection: 'row',
        maxHeight: 86,
        width: '100%',
        borderBottomWidth: 1,
        borderColor: 'lightgray',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingBottom: 15,
    },
    headerTitle: {
        fontSize: 18,
        textAlign: 'left',
        fontWeight: 'bold',
        width: '100%',
        paddingLeft: 110
    },
    closeButton: {
        paddingLeft: 80
    },

});
