import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity, Text, Modal, } from 'react-native';
import { callWorks } from '../fakeApi/fakeapi'; // Importa os dados de obras (fake)

export default function Comments({ navigation }) { //recebe navigation
  const [selectedObra, setSelectedObra] = useState(null); //estado da obra selecionada
  const [modalVisible, setModalVisible] = useState(false); //modal inicializa fechado

  //função chamada ao pressionar no botão de uma obra
  const handleObraPress = (obra) => {
    setSelectedObra(obra); //define a obra selecionada
    // Navega para a tela de chat ao clicar no botão "Chat"
    navigation.navigate('Chat', { obra });
  };
  

  // Retorna a interface da lista de comentários

  return (
    <ScrollView style={styles.container}>
      {/* Mapeia minha Api fake, obra representa os elementos */}
      {callWorks.map((obra) => (
        //Botão principal
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
          </View>
        </TouchableOpacity>
      ))}

      {/*
      {selectedObra && (
        <View style={styles.selectedObraContainer}>
          <Text>{selectedObra.name}</Text>
        </View>
      //)}
      */}

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
