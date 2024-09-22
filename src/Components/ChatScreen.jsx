  import React, { useState, useEffect } from 'react';
  import { View, Text, TextInput, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';

  export default function ChatScreen({ route }) {
    // Estados para controlar a entrada de mensagem, as mensagens exibidas e os filtros
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [showAlunoMessages, setShowAlunoMessages] = useState(false);
    const [showProfessorMessages, setShowProfessorMessages] = useState(false);
    const [showAllMessages, setShowAllMessages] = useState(false);

    // Função para enviar uma mensagem
    const sendMessage = () => {
      if (message.trim() === '') return;

      const newMessage = {
        id: messages.length + 1,
        text: message,
        sender: 'user',
        timestamp: Date.now(),
      };

      setMessages(prevMessages => [...prevMessages, newMessage]);
      setMessage('');
    };

    // Efeito para simular mensagens recebidas após um período de tempo
    useEffect(() => {
      setTimeout(() => {
        const professorMessage = {
          id: messages.length + 1,
          text: 'Fala pessoal, conseguiram fazer a atividade?',
          sender: 'professor',
          timestamp: Date.now(),
        };

        setMessages(prevMessages => [...prevMessages, professorMessage]);

        const aluno1Message = {
          id: messages.length + 2,
          text: 'Super easy, pode mandar outra!',
          sender: 'aluno1',
          timestamp: Date.now(),
        };

        setMessages(prevMessages => [...prevMessages, aluno1Message]);

        const aluno2Message = {
          id: messages.length + 3,
          text: 'Vamos dar um tempo nas atividades, prof. Ronan, tem TCC para fazer',
          sender: 'aluno2',
          timestamp: Date.now(),
        };

        setMessages(prevMessages => [...prevMessages, aluno2Message]);
      }, 2000);
    }, []);

    // Função para formatar o timestamp das mensagens
    const formatTimestamp = (timestamp) => {
      const date = new Date(timestamp);
      const hour = date.getHours().toString().padStart(2, '0');
      const minute = date.getMinutes().toString().padStart(2, '0');
      return `${hour}:${minute}`;
    };

    // Funções para aplicar os filtros de exibição das mensagens
    const filterAlunoMessages = () => {
      setShowAlunoMessages(true);
      setShowProfessorMessages(false);
      setShowAllMessages(false);
    };

    const filterProfessorMessages = () => {
      setShowProfessorMessages(true);
      setShowAlunoMessages(false);
      setShowAllMessages(false);
    };

    const filterAllMessages = () => {
      setShowAllMessages(true);
      setShowAlunoMessages(false);
      setShowProfessorMessages(false);
    };

    // Renderização do componente de chat
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          {/* Componente para os botões de filtro */}
          <View style={styles.filterContainer}>
            <TouchableOpacity style={styles.filterButton} onPress={filterAlunoMessages}>
              <Text style={styles.filterButtonText}>Filtrar Alunos</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterButton} onPress={filterProfessorMessages}>
              <Text style={styles.filterButtonText}>Filtrar Professores</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterButton} onPress={filterAllMessages}>
              <Text style={styles.filterButtonText}>Mostrar Tudo</Text>
            </TouchableOpacity>
          </View>

          {/* Componente para exibir as mensagens */}
          <View style={styles.chatContainer}>
          {messages.map((msg) => (
            ((!showAlunoMessages && !showProfessorMessages && !showAllMessages) || 
            (showAlunoMessages && (msg.sender.startsWith('aluno') || msg.sender === 'user')) ||  // Aqui adicionamos a condição para incluir mensagens do usuário
            (showProfessorMessages && msg.sender === 'professor') || 
            showAllMessages) && (
              <View key={msg.id}>
                {msg.sender !== 'user' && (
                  <Text style={styles.sender}>
                    {msg.sender === 'professor' ? 'Professor' : `Aluno ${msg.sender.substr(-1)}`}
                  </Text>
                )}
                <View style={msg.sender === 'user' ? styles.userMessage : msg.sender === 'professor' ? styles.professorMessage : styles.alunoMessage}>
                  <Text>{msg.text}</Text>
                </View>
                <Text style={[styles.timestamp, msg.sender === 'user' ? { alignSelf: 'flex-end' } : { alignSelf: 'flex-start' }]}>
                  {formatTimestamp(msg.timestamp)}
                </Text>
                <View style={{ height: 5 }} />
              </View>
            )
  ))}
          </View>

          {/* Componente para entrada de nova mensagem */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Digite sua mensagem..."
              value={message}
              onChangeText={(text) => setMessage(text)}
            />
            <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
              <Text style={styles.sendButtonText}>Enviar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  // Estilos do componente ChatScreen
  const styles = StyleSheet.create({
    chatContainer: {
      flex: 1,
      padding: 10,
      backgroundColor: '#F8F8F8',
    },
    sender: {
      fontWeight: 'bold',
      marginBottom: 5,
    },
    userMessage: {
      alignSelf: 'flex-end',
      backgroundColor: '#E5E5EA',
      padding: 10,
      marginVertical: 5,
      maxWidth: '80%',
      borderRadius: 10,
      elevation: 2,
    },
    professorMessage: {
      alignSelf: 'flex-start',
      backgroundColor: '#E0E0E0',
      padding: 10,
      marginVertical: 5,
      maxWidth: '80%',
      borderRadius: 10,
      elevation: 2,
    },
    alunoMessage: {
      alignSelf: 'flex-start',
      backgroundColor: '#81C784',
      padding: 10,
      marginVertical: 5,
      maxWidth: '80%',
      borderRadius: 10,
      elevation: 2,
    },
    timestamp: {
      fontSize: 10,
      color: '#888',
      alignSelf: 'flex-end', // Ajuste do alinhamento padrão para flex-end
    },
    
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 90,
      paddingHorizontal: 10,
      paddingBottom: 10,
      borderTopWidth: 1,
      borderTopColor: '#ccc',
      backgroundColor: '#FFFFFF',
    },
    input: {
      flex: 1,
      height: 50,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 20,
      paddingHorizontal: 15,
      marginRight: 10,
    },
    sendButton: {
      backgroundColor: '#219653',
      borderRadius: 30,
      paddingVertical: 14,
      paddingHorizontal: 20,
      elevation: 2,
    },
    sendButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    filterContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingVertical: 10,
    },
    filterButton: {
      paddingHorizontal: 20,
      paddingVertical: 20,
      borderRadius: 10,
    },
    filterButtonText: {
      color: '#052F0E',
      fontWeight: 'bold',
    },
  });
