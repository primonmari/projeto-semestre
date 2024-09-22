import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, addDoc } from "firebase/firestore"; 

import db from '../../services/firebaseConf';

const CadastroScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCadastro = async () => {
    try {
      // Verifica se o e-mail contém "@ifpr" em algum ponto
      const ifprRegex = /@.*ifpr/i;
      if (!ifprRegex.test(email)) {
        Alert.alert('Erro de cadastro', 'Por favor, insira um e-mail válido do IFPR.');
        return;
      }

      // Verifica se a senha está preenchida
      if (!password) {
        Alert.alert('Erro de cadastro', 'A senha é obrigatória.');
        return;
      }

      // Salva o e-mail e a senha no AsyncStorage
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('password', password);

      // Redireciona o usuário para a tela de login com e-mail e senha memorizados
      navigation.navigate("Login", { email: email, password: password });

    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao tentar fazer o cadastro.');
      console.error('Error:', error);
    }

    // Armazenar no Firestore
    try {
      const docRef = await addDoc(collection(db, "usuarios"), {
        email,
        password
      });

      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={text => setEmail(text)}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry={true}
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
  button: {
    width: '80%',
    height: 40,
    backgroundColor:  '#358957',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#052F0E',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CadastroScreen;
