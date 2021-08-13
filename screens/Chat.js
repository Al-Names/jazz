import React from 'react';
import { StyleSheet, View } from 'react-native';
import { RecoilRoot } from 'recoil';
import MessagesScreen from '../components/MessagesScreen';
import RoomsScreen from '../components/RoomsScreen';

function ChatScreen () {
  return (
    <View style={styles.container}>
    
      <MessagesScreen />
    </View>
  );
}

function Chat() {
  return (
    <RecoilRoot>
      <ChatScreen />
    </RecoilRoot>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
});

export default Chat;
