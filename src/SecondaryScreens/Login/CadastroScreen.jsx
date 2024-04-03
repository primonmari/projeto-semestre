import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";

const CadastroScreen = () => {
  const navigation = useNavigation(); // Obtém o objeto de navegação

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCadastro = () => {
    // Verifica se o e-mail contém "@ifpr" em algum ponto
    const ifprRegex = /@.*ifpr/i;
    if (!ifprRegex.test(email)) {
      Alert.alert('Erro de cadastro', 'Por favor, insira um e-mail válido do IFPR.');
      return; // Impede o cadastro se o e-mail não for válido
    }
  
    // Aqui você pode adicionar lógica para criar a conta do usuário com o backend
    // Por exemplo, fazer uma solicitação para enviar os dados do cadastro para o servidor
  
    console.log('E-mail:', email);
    console.log('Senha:', password);
    
    // Redireciona o usuário para a tela de login com e-mail e senha memorizados
    navigation.navigate("Login", { email: email, password: password });
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={text => setEmail(text)}
        keyboardType="email-address" // Define o teclado para facilitar a entrada de e-mails
        autoCapitalize="none" // Impede que o texto seja automaticamente capitalizado
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
    backgroundColor: '#007bff',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CadastroScreen;
