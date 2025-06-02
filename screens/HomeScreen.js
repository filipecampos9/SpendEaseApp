import { StyleSheet, ImageBackground, Text, View, TouchableOpacity, Image, FlatList, SafeAreaView, Platform, StatusBar } from 'react-native'
import React, { useMemo } from 'react'
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase';
import Ionicons from '@expo/vector-icons/Ionicons';

const defaultUserImage = require('../assets/default-user.jpg');

const HomeScreen = () => {
      const navigation = useNavigation();

      const totalBalance = 1000;
      const income = 500;
      const expense = 300;

      const transactions = useMemo(() => [
        { id: '1', title: 'Salary', amount: +1200, date: '2025-10-01' },
        { id: '2', title: 'Groceries', amount: -300, date: '2025-10-02' },
        { id: '3', title: 'Diesel', amount: -50, date: '2025-10-03' },
        { id: '4', title: 'Diesel', amount: -50, date: '2025-10-03' },
        { id: '5', title: 'Diesel', amount: -50, date: '2025-10-03' },
        { id: '6', title: 'Diesel', amount: -50, date: '2025-10-03' },
      ], []);


  return (
    <SafeAreaView style={styles.safeArea}>
      {Platform.OS === 'android' && <View style={styles.statusBarPadding} />}

      <ImageBackground
        source={require('../assets/underCard.png')}
        resizeMode="cover"
        style={styles.backgroundImage}
      />

      <View style={styles.container}>

        {/* Header */}
        <View style={styles.topBar}>
          <View style={styles.userInfo}>
            <Text style={styles.greeting}>Good morning:</Text>
            <Text style={styles.userName}>{auth.currentUser?.displayName}</Text>
          </View>

          <View style={styles.userImageOuter}>
            <Image
            source={defaultUserImage}
            style={styles.userImage}
          />
          </View>
        </View>

        {/* Balance Section */}
        <View style={styles.balanceCard}>
          <Text style={styles.totalBalance}>Total Balance</Text>
          <Text style={styles.balanceAmount}>€ {totalBalance.toFixed(2)}</Text>

          <View style={styles.incomeExpenseContainer}>
            <View style={[styles.incomeExpenseBox, { alignItems: 'flex-start' }]}>
              <View style={styles.labelRow}>
                <Ionicons name="arrow-up-circle-outline" size={24} color="white" />
                <Text style={styles.label}>Income</Text>
              </View>
              <Text style={styles.transactionBalance}>€ {income.toFixed(2)}</Text>
            </View>

            <View style={[styles.incomeExpenseBox, { alignItems: 'flex-end' }]}>
              <View style={styles.labelRow}>
                <Ionicons name="arrow-down-circle-outline" size={24} color="white" />
                <Text style={styles.label}>Expense</Text>
              </View>
              <Text style={styles.transactionBalance}>€ {expense.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        {/* Transactions Section */}
        <View style={styles.transactionList}>
          <Text style={styles.sectionTitle}>Transações Recentes</Text>

          <FlatList
            data={transactions}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.transactionItem}>
                <Text style={styles.transactionTitle}>{item.title}</Text>
                <View style={styles.transactionRight}>
                  <Text style={[
                    styles.transactionAmount,
                    item.amount < 0 ? styles.expense : styles.income
                  ]}>
                    € {Math.abs(item.amount).toFixed(2)}
                  </Text>
                  <Text style={styles.transactionDate}>{item.date}</Text>
                </View>
              </View>
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
        
      </View> 

    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  statusBarPadding: {
    height: StatusBar.currentHeight,
    backgroundColor: 'transparent',
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  topBar: {
    width: '100%',
    height: 100,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
    justifyContent: 'space-between',
  },
  backgroundImage: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  height: 330,
  resizeMode: 'cover',
  zIndex: -1,
  },
  userInfo: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  greeting: {
    color: '#ffffff',
    fontSize: 14,
  },
  userName: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: 'bold',
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#0E3452',
  },
  userImageOuter: {
    width: 58,
    height: 58,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0E3452',
  },
  balanceCard: {
    width: '90%',
    backgroundColor: '#0E3452',
    borderRadius: 20,
    padding: 20,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
  },
  totalBalance: {
    fontSize: 18,
    color: '#ffffff',
    marginBottom: 10,
  },
  balanceAmount: {
    fontSize: 36,
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 0,
  },
  incomeExpenseContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  incomeExpenseBox: {
    width: '50%',
    paddingVertical: 5,
  },
  label: {
    fontSize: 20,
    color: '#ffffff',
  },
  transactionBalance: {
    fontSize: 26,
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  income: {
    fontSize: 22,
    color: '#28a745',
    fontWeight: 'bold',
  },
  expense: {
    fontSize: 22,
    color: '#dc3545',
    fontWeight: 'bold',
  },
  transactionList: {
    width: '90%',
    marginTop: 20,
    flex: 1,
  },
  sectionTitle: {
    fontSize: 24,
    color: '#000000',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  transactionTitle: {
    fontSize: 18,
    color: '#000000',
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 5,
  },
  transactionDate: {
    fontSize: 14,
    color: '#6c757d',
  },
})