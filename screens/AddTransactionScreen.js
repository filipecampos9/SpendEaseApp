import React, { useState } from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ImageBackground, SafeAreaView, Platform, StatusBar, TextInput, Alert,} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { db, auth } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { Dropdown } from 'react-native-paper-dropdown';


const initialCategories = ['Alimentação', 'Transporte', 'Saúde', 'Salário', 'Lazer']; // Categories = ['Alimentação', 'Transporte', 'Saúde', 'Salário', 'Lazer'];

const AddTransactionScreen = () => {
  const navigation = useNavigation();

  const [tipo, setTipo] = useState('Despesa');
  const [showTipoDropdown, setShowTipoDropdown] = useState(false);

  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
  const [showCategoriaDropdown, setShowCategoriaDropdown] = useState(false);

  const [valor, setValor] = useState('');
  const [data, setData] = useState(new Date());
  const [mostrarDatePicker, setMostrarDatePicker] = useState(false);

  const toggleTipoDropdown = () => setShowTipoDropdown(!showTipoDropdown);
  const toggleCategoriaDropdown = () => setShowCategoriaDropdown(!showCategoriaDropdown);

  const adicionarTransacao = async () => {
    if (!categoriaSelecionada || !valor) {
      Alert.alert('Erro', 'Preenche todos os campos.');
      return;
    }

    const novaTransacao = {
      tipo,
      categoria: categoriaSelecionada,
      valor: parseFloat(valor),
      data: Timestamp.fromDate(data), // Converte a data para o formato do Firestore
      userId: auth.currentUser?.uid, // Adiciona o ID do utilizador
    };

    try {
      const user = auth.currentUser;
      if (!user) {
        Alert.alert('Erro', 'Utilizador não autenticado.');
        return;
      }

      const transactionsCollectionRef = collection(db, 'users', user.uid, 'transactions');

      await addDoc(transactionsCollectionRef, novaTransacao);

      Alert.alert('Sucesso', 'Transação adicionada!');

      // Limpa os campos após adicionar a transação
      setTipo('Despesa');
      setCategoriaSelecionada('');
      setValor('');
      setData(new Date());

      navigation.goBack();

    } catch (error) {
      console.error('Erro ao guardar:', error);
      Alert.alert('Erro', 'Não foi possível guardar a transação.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {Platform.OS === 'android' && <View style={styles.statusBarPadding} />}

      <ImageBackground
        source={require('../assets/underCard.png')}
        resizeMode="cover"
        style={styles.backgroundImage}
      />


      {/* Header */}
      <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.transactionText}>Add Transaction</Text>
          <View style={{ width: 24 }} />
      </View>

      <View style={styles.centerWrapper}>
        <View style={styles.container}>
          {/* Tipo (Despesa/Ganho) */}
          <Text style={styles.label}>Type</Text>
          <TouchableOpacity style={styles.dropdown} onPress={toggleTipoDropdown}>
            <View style={styles.dropdownContent}>
              <Text style={styles.dropdownText}>{tipo}</Text>
              <Ionicons name="chevron-down" size={18} color="#333" />
            </View>
          </TouchableOpacity>
          {showTipoDropdown && (
            <View style={styles.dropdownMenu}>
              {['Despesa', 'Ganho'].map(opcao => (
                <TouchableOpacity
                  key={opcao}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setTipo(opcao);
                    setShowTipoDropdown(false);
                  }}
                >
                  <Text>{opcao}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Categoria */}
          <Text style={styles.label}>Category</Text>
          <TouchableOpacity style={styles.dropdown} onPress={toggleCategoriaDropdown}>
            <View style={styles.dropdownContent}>
              <Text style={styles.dropdownText}>
                {categoriaSelecionada || 'Seleciona Categoria'}
              </Text>
              <Ionicons name="chevron-down" size={18} color="#333" />
            </View>
          </TouchableOpacity>
          {showCategoriaDropdown && (
            <View style={styles.dropdownMenu}>
              {initialCategories.map(cat => (
                <TouchableOpacity
                  key={cat}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setCategoriaSelecionada(cat);
                    setShowCategoriaDropdown(false);
                  }}
                >
                  <Text>{cat}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          
          {/* Valor */}
          <Text style={styles.label}></Text>
          <TextInput
            style={styles.input}
            placeholder="0.00"
            keyboardType="numeric"
            value={valor}
            onChangeText={setValor}
          />

          {/* Data */}
          <Text style={styles.label}>Date</Text>
          <TouchableOpacity onPress={() => setMostrarDatePicker(true)} style={styles.dateButton}>
            <Text style={styles.dateText}>
              {new Intl.DateTimeFormat('pt-PT', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
              }).format(data)}
            </Text>
          </TouchableOpacity>
          {mostrarDatePicker && (
            <DateTimePicker
              value={data}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                const currentDate = selectedDate || data;
                setMostrarDatePicker(false);
                setData(currentDate);
              }}
            />
          )}

          {/* Botão Adicionar */}
          <TouchableOpacity style={styles.addButton} onPress={adicionarTransacao}>
            <Text style={styles.addButtonText}>Adicionar</Text>
          </TouchableOpacity>
        </View>
      </View>  
    </SafeAreaView>
  );
};

export default AddTransactionScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  statusBarPadding: {
    height: StatusBar.currentHeight,
    backgroundColor: 'transparent',
  },
  centerWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 150,
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
  label: {
    fontSize: 12,
    color: '#333',
    marginTop: 20,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  container: {
    padding: 20,
    width: '90%',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    marginBottom: 60,
    shadowRadius: 20,
    elevation: 20,
  },
  topBar: {
    marginTop: 80,
    paddingHorizontal: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  transactionText: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  dropdown: {
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 6,
    backgroundColor: '#fff', // necessário para a sombra ser visível
    // Shadow para iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    // Shadow para Android
    elevation: 2,
  },
  dropdownText: {
    fontSize: 16,
  },
  dropdownMenu: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 5,
    borderRadius: 6,
  },
  dropdownItem: {
    padding: 12,
    backgroundColor: '#f0f0f0',
  },
  dropdownContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 6,
    marginTop: 5,
    backgroundColor: '#fff', // necessário para a sombra ser visível
    // Shadow para iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    // Shadow para Android
    elevation: 2,
  },
  dateButton: {
    marginTop: 5,
    padding: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff', // necessário para a sombra ser visível
    // Shadow para iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    // Shadow para Android
    elevation: 2,
  },
  dateText: {
    fontSize: 16,
  },
  addButton: {
    marginTop: 30,
    backgroundColor: '#2196F3',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
