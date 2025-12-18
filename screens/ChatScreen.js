import React, { useState, useEffect } from "react";
import { View, TextInput, Button, FlatList, Text } from "react-native";
import { collection, addDoc, onSnapshot, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";

export default function ChatScreen() {
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    return onSnapshot(collection(db, "messages"), snap => {
      setMessages(snap.docs.map(d => d.data()));
    });
  }, []);

  const send = async () => {
    await addDoc(collection(db, "messages"), {
      text: msg,
      user: auth.currentUser.email,
      createdAt: serverTimestamp()
    });
    setMsg("");
  };

  return (
    <View>
      <FlatList data={messages} renderItem={({item}) => (
        <Text>{item.user}: {item.text}</Text>
      )} />
      <TextInput placeholder="Message" value={msg} onChangeText={setMsg} />
      <Button title="Send" onPress={send} />
    </View>
  );
}
