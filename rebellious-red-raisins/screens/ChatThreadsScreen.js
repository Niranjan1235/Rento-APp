import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const initialChatThreads = [
  { id: '1', name: 'Ayush soni', initials: 'A', color: '#00BCD4', messages: 1, unreadMessages: 1 },
  { id: '2', name: 'Niranjan', initials: 'N', color: '#8BC34A', messages: 3, unreadMessages: 3 },
  { id: '3', name: 'Karunakar', initials: 'K', color: '#FF9800', messages: 1, unreadMessages: 1 },
  { id: '4', name: 'Govardhan', initials: 'G', color: '#9C27B0', messages: 0, unreadMessages: 0 },
];

const ChatThreadsScreen = ({ navigation }) => {
  const [chatThreads, setChatThreads] = useState(initialChatThreads);

  const handleThreadPress = (item) => {
   
    const updatedThreads = chatThreads.map(thread =>
      thread.id === item.id ? { ...thread, unreadMessages: 0 } : thread
    );
    
    setChatThreads(updatedThreads);
   
    navigation.navigate('Chat', { tenantName: item.name, chatThreads: updatedThreads });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tenants chat threads</Text>
      <FlatList
        data={chatThreads}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleThreadPress(item)}>
            <View style={styles.thread}>
              <View style={[styles.initialsContainer, { backgroundColor: item.color }]}>
                <Text style={styles.initials}>{item.initials}</Text>
              </View>
              <Text style={styles.name}>{item.name}</Text>
              {item.unreadMessages > 0 && ( 
                <View style={styles.messageBadge}>
                  <Text style={styles.messageCount}>{item.unreadMessages}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        )}
      />
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
    marginBottom: 20,
  },
  thread: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    marginBottom: 10,
  },
  initialsContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  initials: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 16,
    flex: 1,
  },
  messageBadge: {
    backgroundColor: '#ff00ff',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  messageCount: {
    color: '#fff',
    fontSize: 14,
  },
});

export default ChatThreadsScreen;
