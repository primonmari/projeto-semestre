import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { collection, query, where, getDocs } from "firebase/firestore";
import db from '../../services/firebaseConf';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const usuarios = collection(db, 'usuarios');
      const q = query(usuarios, where("email", "==", email));
      const dados = await getDocs(q);

      if (dados.empty) {
        // Se a consulta não retornar nenhum documento, o email está incorreto
        Alert.alert('Erro de login', 'Email não encontrado.');
        return;
      }

      let usuarioEncontrado = false;

      // Verificar cada documento retornado
      dados.forEach(dado => {
        const userData = dado.data();
        if (userData.password === password) {
          usuarioEncontrado = true;
          navigation.navigate("Grupos");
        }
      });

      if (!usuarioEncontrado) {
        // Se a senha não coincidir, exibir mensagem de erro
        Alert.alert('Erro de login', 'Senha incorreta.');
      }

    } catch (error) {
      // Exibe um alerta em caso de erro ao acessar o Firestore
      Alert.alert('Erro', 'Ocorreu um erro ao tentar fazer o login.');
      console.error('Error:', error);
    }
  };

  const handleCadastroPress = () => {
    navigation.navigate('Cadastro');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry={true}
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleCadastroPress}>
        <Text style={styles.cadastroLink}>Não tem uma conta? Cadastrar-se</Text>
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
    backgroundColor: '#358957',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#052F0E',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cadastroLink: {
    color: '#052F0E',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
