import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity, Text, Modal, TextInput, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Comments from '../src/SecondaryScreens/Comments';
import ChatScreen from '../src/Components/ChatScreen'; // Importa o componente de tela de chat

const Stack = createStackNavigator(); // Cria uma pilha de navegação

export default function StackRoutes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Comments" component={Comments} options={{ title: 'Comentários', headerBackTitle: 'Voltar' }} />
        <Stack.Screen name="Chat" component={ChatScreen} options={{ title: 'Chat', headerBackTitle: 'Voltar' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
