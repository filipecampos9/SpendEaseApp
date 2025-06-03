import React, { useState } from 'react';
import {StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Platform, StatusBar, TextInput, Alert,} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { db, auth } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const initialCategories = ['Alimentação', 'Transporte', 'Saúde', 'Salário', 'Lazer'];

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
      data: data,
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
      navigation.goBack();

    } catch (error) {
      console.error('Erro ao guardar:', error);
      Alert.alert('Erro', 'Não foi possível guardar a transação.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {Platform.OS === 'android' && <View style={styles.statusBarPadding} />}

      <View style={styles.container}>
        {/* Header */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.transactionText}>Adicionar Transação</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Tipo (Despesa/Ganho) */}
        <TouchableOpacity style={styles.dropdown} onPress={toggleTipoDropdown}>
          <Text style={styles.dropdownText}>{tipo}</Text>
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
        <TouchableOpacity style={styles.dropdown} onPress={toggleCategoriaDropdown}>
          <Text style={styles.dropdownText}>
            {categoriaSelecionada || 'Seleciona Categoria'}
          </Text>
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
        <TextInput
          style={styles.input}
          placeholder="Valor"
          keyboardType="numeric"
          value={valor}
          onChangeText={setValor}
        />

        {/* Data */}
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
    </SafeAreaView>
  );
};

export default AddTransactionScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBarPadding: {
    height: StatusBar.currentHeight,
    backgroundColor: 'transparent',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  transactionText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dropdown: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 6,
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 6,
    marginTop: 20,
  },
  dateButton: {
    marginTop: 20,
    padding: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ccc',
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
