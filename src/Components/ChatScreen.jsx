import React, { useState } from 'react'; // Importa o hook useState do React
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'; // Importa os componentes necessários do React Native

// Declaração do componente ChatScreen
export default function ChatScreen({ route }) {
  // Define dois estados usando o hook useState
  const [message, setMessage] = useState(''); // Estado para armazenar a mensagem digitada pelo usuário
  const [messages, setMessages] = useState([]); // Estado para armazenar as mensagens enviadas

  // Função para enviar mensagem
  const sendMessage = () => {
    // Verifica se a mensagem está vazia antes de enviar
    if (message.trim() === '') return; // Retorna se a mensagem estiver vazia

    // Cria uma nova mensagem com um id único e o texto da mensagem digitada
    const newMessage = {
      id: messages.length + 1, // Incrementa o id com base no número de mensagens existentes
      text: message, // Armazena o texto da mensagem
      sender: 'user', // Define o remetente da mensagem (neste caso, o usuário)
    };

    // Atualiza o estado das mensagens adicionando a nova mensagem à lista existente
    setMessages([...messages, newMessage]);

    // Limpa a caixa de entrada da mensagem
    setMessage('');
  };

  // Retorna a interface do componente ChatScreen
  return (
    <View style={{ flex: 1 }}>
      {/* Container para exibir as mensagens */}
      <View style={styles.chatContainer}>
        {/* Mapeia e exibe todas as mensagens armazenadas */}
        {messages.map((msg) => (
          <View key={msg.id} style={msg.sender === 'user' ? styles.userMessage : styles.otherMessage}>
            <Text>{msg.text}</Text>
          </View>
        ))}
      </View>

      {/* Container para a caixa de entrada da mensagem */}
      <View style={styles.inputContainer}>
        {/* Componente TextInput para entrada de texto */}
        <TextInput
          style={styles.input}
          placeholder="Digite sua mensagem..." // Texto de placeholder
          value={message} // Valor da mensagem (controlado pelo estado)
          onChangeText={(text) => setMessage(text)} // Função para atualizar o estado da mensagem
        />
        
        {/* Botão para enviar a mensagem */}
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Estilos CSS para o componente ChatScreen
const styles = StyleSheet.create({
  // Estilos para o container das mensagens
  chatContainer: {
    flex: 1,
    padding: 10,
  },
  // Estilos para as mensagens do usuário
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#FFFFFF',
    padding: 10,
    marginVertical: 5,
    maxWidth: '80%',
    borderRadius: 10,
  },
  // Estilos para as mensagens de outros remetentes
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#E5E5EA',
    padding: 10,
    marginVertical: 5,
    maxWidth: '80%',
    borderRadius: 10,
  },
  // Estilos para o container da caixa de entrada da mensagem
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 90,
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  // Estilos para a caixa de entrada de texto
  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  // Estilos para o botão de enviar mensagem
  sendButton: {
    backgroundColor: '#0B006B',
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  // Estilos para o texto do botão de enviar mensagem
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
