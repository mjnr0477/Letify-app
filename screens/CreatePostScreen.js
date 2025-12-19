import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";

export default function CreatePostScreen({ navigation }) {
  const [text, setText] = useState("");

  const post = async () => {
    try {
      await addDoc(collection(db, "posts"), {
        text,
        user: auth.currentUser.email,
        createdAt: serverTimestamp()
      });
      navigation.goBack();
    } catch (e) {
      Alert.alert("Post failed", e.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="What's on your mind?" value={text} onChangeText={setText} />
      <Button title="Post" onPress={post} />
    </View>
  );
}
