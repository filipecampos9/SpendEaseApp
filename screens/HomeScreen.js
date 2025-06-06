import { StyleSheet, ImageBackground, Text, View, TouchableOpacity, Image, FlatList, SafeAreaView, Platform, StatusBar } from 'react-native'
import React, { useState, useEffect, useMemo } from 'react'
import { useNavigation } from '@react-navigation/native';
import { db, auth } from '../firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

import Ionicons from '@expo/vector-icons/Ionicons';

const defaultUserImage = require('../assets/default-user.jpg');

const HomeScreen = () => {
      const navigation = useNavigation();

      const [transactions, setTransactions] = useState([]);

      const { income, expense, totalBalance } = useMemo(() => {
        const income = transactions
          .filter(t => t.tipo === 'Ganho')
          .reduce((sum, t) => sum + t.valor, 0);

        const expense = transactions
          .filter(t => t.tipo === 'Despesa')
          .reduce((sum, t) => sum + t.valor, 0);

        const totalBalance = income - expense;

        return { income, expense, totalBalance };
      }, [transactions]);


      useEffect(() => {
        if (!auth.currentUser) return;

        const transactionsRef = collection(db, 'users', auth.currentUser.uid, 'transactions');

        const transactionsQuery = query(
          transactionsRef,
          orderBy('data', 'desc') // ordena por data de forma decrescente
        );

        const unsubscribe = onSnapshot(transactionsQuery, (snapshot) => {
          const transactionsData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));

          setTransactions(transactionsData);
        }, (error) => {
          console.error('Erro ao ouvir transações:', error);
        });

        return () => unsubscribe();
      }, []);


      const formatDate = (timestamp) => {
        if (!timestamp) return '';

        const date = timestamp.toDate();

        return new Intl.DateTimeFormat('pt-PT', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }).format(date);
      };

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
          <Text style={styles.balanceAmount}>{totalBalance.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' })}</Text>

          <View style={styles.incomeExpenseContainer}>
            <View style={[styles.incomeExpenseBox, { alignItems: 'flex-start' }]}>
              <View style={styles.labelRow}>
                <Ionicons name="arrow-down-circle-outline" size={24} color="white" />
                <Text style={styles.label}>Income</Text>
              </View>
              <Text style={styles.transactionBalance}>{income.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' })}</Text>
            </View>

            <View style={[styles.incomeExpenseBox, { alignItems: 'flex-end' }]}>
              <View style={styles.labelRow}>
                <Ionicons name="arrow-up-circle-outline" size={24} color="white" />
                <Text style={styles.label}>Expense</Text>
              </View>
              <Text style={styles.transactionBalance}>{expense.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' })}</Text>
            </View>
          </View>
        </View>

        {/* Transactions Section */}
        <View style={styles.transactionList}>
          <Text style={styles.sectionTitle}>Transactions History</Text>

          <FlatList
            data={transactions.slice(0, 10)}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.transactionItem}>
                <View style={styles.transactionLeft}>
                  <Text style={styles.transactionTitle}>{item.categoria}</Text>
                  <Text style={styles.transactionDate}>{formatDate(item.data)}</Text>
                </View>
                <View style={styles.transactionRight}>
                  <Text style={[
                    styles.transactionAmount,
                    item.tipo === 'Despesa' ? styles.expense : styles.income
                  ]}>
                    {item.tipo === 'Despesa' ? '- ' : '+ '}€ {Math.abs(item.valor).toFixed(2)}
                  </Text>
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
    fontSize: 16,
    color: '#ffffff',
  },
  balanceAmount: {
    fontSize: 34,
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
    fontSize: 16,
    color: '#ffffff',
  },
  transactionBalance: {
    fontSize: 26,
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  income: {
    fontSize: 20,
    color: '#28a745',
    fontWeight: 'bold',
  },
  expense: {
    fontSize: 20,
    color: '#dc3545',
    fontWeight: 'bold',
  },
  transactionList: {
    width: '90%',
    marginTop: 20,
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
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
  transactionLeft: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  transactionAmount: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 5,
  },
  transactionDate: {
    fontSize: 12,
    color: '#6c757d',
  },
})