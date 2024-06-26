import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const ChatScreen = ({ route }) => {
  const { tenantName } = route.params || { tenantName: 'Govardhan' }; // Provide a default value if route.params is undefined
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hey ', sender: 'tenant' },
    { id: '2', text: 'Wassup', sender: 'tenant' },
    { id: '3', text: 'Hi Raj, I\'m good : )', sender: 'owner' },
    { id: '4', text: 'I\'ll give my rent tomorrow', sender: 'tenant' },
    { id: '5', text: 'Is it okay?', sender: 'tenant' },
    { id: '6', text: 'you just send it to my number through UPI', sender: 'owner' },
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (inputText.trim()) {
      setMessages([...messages, { id: Date.now().toString(), text: inputText, sender: 'owner' }]);
      setInputText('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tenant Chat: {tenantName}</Text>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.messageContainer, item.sender === 'owner' ? styles.ownerMessage : styles.tenantMessage]}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type Something..."
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 18,
    marginBottom: 10,
  },
  messageContainer: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  ownerMessage: {
    backgroundColor: '#ff00ff',
    alignSelf: 'flex-end',
  },
  tenantMessage: {
    backgroundColor: '#f5f5f5',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginRight: 10,
  },
  sendButton: {
    padding: 10,
    backgroundColor: '#ff00ff',
    borderRadius: 5,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ChatScreen;
