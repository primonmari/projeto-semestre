import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity, Text, Modal, } from 'react-native';
import { callWorks } from '../fakeApi/fakeapi'; // Importa os dados de grupos (fake)

export default function Group({ navigation }) { //recebe navigation
  const [selectedGroup, setSelectedGroup] = useState(null); //estado do grupo selecionado
  const [modalVisible, setModalVisible] = useState(false); //modal inicializa fechado

  //função que é chamada ao pressionar no botão de um grupo
  const handleGroupPress = (group) => {
    setSelectedGroup(group); //define o grupo selecionado
    // Navega para a tela de chat ao clicar no botão "Chat"
    navigation.navigate('Chat', { group });
  };
  

  // Retorna a interface da lista de comentários
  return (
    <ScrollView style={styles.container}>
      {/* Mapeia minha Api fake, grupo representa os elementos */}
      {callWorks.map((group) => (
        //Botão principal
        <TouchableOpacity
          key={group.id} //pega elemento renderizado
          style={styles.button}
          onPress={() => handleGroupPress(group)} //quando botão é pressionado
        >
          <View style={styles.circle}>
            <Text style={styles.circleText}>{group.name.charAt(0).toUpperCase()}</Text>

          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{group.name}</Text>
            
            {/* Botão para abrir a tela de bate-papo */}
            <TouchableOpacity
              style={styles.chatButton}
              onPress={() => handleGroupPress(group)}
            >
              <Text style={styles.chatButtonText}>Chat</Text>
            </TouchableOpacity>         
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
        </View>
      </Modal>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
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
    justifyContent: 'center', // Centraliza verticalmente
    alignItems: 'center', // Centraliza horizontalmente
  },
  circleText: {
    color: '#fff', // Cor do texto (branco para contrastar com o fundo)
    fontSize: 24, // Tamanho da fonte para a letra
    fontWeight: 'bold',
    textAlign: 'center', 
    justifyContent: 'center',
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
