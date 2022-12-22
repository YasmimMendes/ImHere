import React, { useState } from 'react';
import { 
  Text, 
  View, 
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert
} from 'react-native';

import { styles } from './styles';

import { Participant } from '../../components/Participant';

export default function Home() {
  const [participants, setParticipants] = useState(['Yan']);

  function handleParticipantAdd(){
    if(participants.includes('Yasmim')){
      return Alert.alert('Já existe!', 'Esse nome já existe.')
    }

    setParticipants(prevState => [...prevState, 'Yasmim']);
  };

  function handleParticipantRemove(name: string){
    Alert.alert(`Excluir`, `Remover ${name}?`, [
      {
        text: 'Sim',
        onPress: () => Alert.alert('Deletado!')
      },
      {
        text: 'Não',
        style: 'cancel'
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>
        Nome do evento
      </Text>

      <Text style={styles.eventDate}>
        Quarta-feira, 21 de dezembro de 2022.
      </Text>

      <View style={styles.form}>
        <TextInput 
          style={styles.input}
          placeholder='Nome'
          placeholderTextColor='#6B6B6B'
        />

        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>
            +
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList 
        data={participants}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Participant
          key={item} 
          name={item}
          onRemove={() => handleParticipantRemove(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Ninguém chegou ainda.
          </Text>
        )}
      />
    </View>
  );
}