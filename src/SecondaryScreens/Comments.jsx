import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity, Text, Modal, TextInput, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import ChatScreen from '../Components/ChatScreen'; // Importa o componente de tela de chat
import { callWorks } from '../fakeApi/fakeapi'; // Importa os dados de obras (fake)

const Stack = createStackNavigator(); // Cria uma pilha de navegação

export default function Comments() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="CommentsList" component={CommentsList} options={{ title: 'Comentários' }} />
        <Stack.Screen name="Chat" component={ChatScreen} options={{ title: 'Chat' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function CommentsList({ navigation }) { //recebe navigation
  const [selectedObra, setSelectedObra] = useState(null); //estado da obra selecionada
  const [modalVisible, setModalVisible] = useState(false); //modal inicializa fechado
  const [message, setMessage] = useState(''); //estado da mensagem inicia vazio por enquanto
  const [comments, setComments] = useState({}); //estado para armazenar os comentários,inicializado 
  //como um objeto vazio {} porque ele será usado para armazenar os comentários relacionados a cada obra.

  //função chamada ao pressionar no botão de uma obra
  const handleObraPress = (obra) => {
    setSelectedObra(obra); //define a obra selecionada
    // Navega para a tela de chat ao clicar no botão "Chat"
    navigation.navigate('Chat', { obra });
  };
  // Função para lidar com a adição de um comentário
  const handleAddComment = () => {
    console.log('Obra selecionada:', selectedObra.name);
    console.log('Mensagem adicionada:', message);

    // Adiciona o novo comentário ao estado de comentários
    const updatedComments = { ...comments }; //cria copia do objeto comments, para não modificar o estado original diretamente
    //updateComments é a copia 
    if (!updatedComments[selectedObra.id]) { //verifica se já existe uma entrada para a obra selecionada dentro do objeto updatedComments. 
      updatedComments[selectedObra.id] = [];//Se não existir, cria uma nova entrada com a chave sendo o ID da obra e o valor sendo uma lista 
      //vazia []. Isso garante que teremos um array onde pode adicionar os comentários.
    }
    updatedComments[selectedObra.id].push(message); //Adiciona o novo comentário à lista de comentários 
    //associada à obra selecionada. A função push() adiciona o message à lista.
    setComments(updatedComments);//atualiza o estado comments com o novo objeto updatedComments, que agora contém o novo comentário adicionado.
    //setModalVisible(false);//fecha modal apos add coment
    // Lógica para enviar a mensagem para o servidor
  };

  // Retorna a interface da lista de comentários
  return (
    <ScrollView style={styles.container}>
      {/* Mapeia minha Api fake, obra representa os elementos */}
      {callWorks.map((obra) => (
        <TouchableOpacity
          key={obra.id} //pega elemento renderizado
          style={styles.button}
          onPress={() => handleObraPress(obra)} //quando botão é pressionado
        >
          <View style={styles.circle}></View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{obra.name}</Text>
            {/* Botão para abrir a tela de bate-papo */}
            <TouchableOpacity
              style={styles.chatButton}
              onPress={() => handleObraPress(obra)}
            >
              <Text style={styles.chatButtonText}>Chat</Text>
            </TouchableOpacity>
            {/* Exibe os comentários para esta obra, se houver */}
            {comments[obra.id] && comments[obra.id].map((comment, index) => (
              <Text key={index}>{comment}</Text>
            ))}
          </View>
        </TouchableOpacity>
      ))}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Adicionar Comentário para {selectedObra?.name}</Text>
            <TextInput
              style={styles.input}
              multiline
              placeholder="Digite sua mensagem..."
              value={message}
              onChangeText={setMessage}
            />
            <Button title="Adicionar Comentário" onPress={handleAddComment} />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    marginTop: 40,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E3E3E3',
    height: 70,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E3E3E3',
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  chatButton: {
    backgroundColor: '#358957',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  chatButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});
