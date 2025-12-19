import React, { useState } from "react";
import { View, TextInput, Button, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "../firebase";

export default function CreatePostScreen({ navigation }) {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7
    });
    if (!result.canceled) setImage(result.assets[0].uri);
  };

  const post = async () => {
    try {
      let imageUrl = "";

      if (image) {
        const blob = await (await fetch(image)).blob();
        const imageRef = ref(storage, `posts/${Date.now()}.jpg`);
        await uploadBytes(imageRef, blob);
        imageUrl = await getDownloadURL(imageRef);
      }

      await addDoc(collection(db, "posts"), {
        text,
        imageUrl,
        user: auth.currentUser.email,
        likes: 0,
        createdAt: serverTimestamp()
      });

      navigation.goBack();
    } catch (e) {
      Alert.alert("Post failed", e.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="What's on your mind?"
        value={text}
        onChangeText={setText}
      />
      <Button title="Pick Image" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ height: 200, marginVertical: 10 }} />}
      <Button title="Post" onPress={post} />
    </View>
  );
}
