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
  const [participants, setParticipants] = useState<string[]>([]);
  const [participantName, setParticipantName] = useState('');

  function handleParticipantAdd(){
    if(participants.includes(participantName)){
      return Alert.alert('Já existe!', 'Alguém já possui esse nome cadastrado.')
    }

    setParticipants(prevState => [...prevState, participantName]);
    setParticipantName('');
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
          onChangeText={setParticipantName}
          value={participantName}
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
            Ainda não há ninguém, adicione!
          </Text>
        )}
      />
    </View>
  );
}