import React, { useState } from "react";
import { View, TextInput, Button, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
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
    let imageUrl = "";

    if (image) {
      const response = await fetch(image);
      const blob = await response.blob();
      const imgRef = ref(storage, `posts/${Date.now()}.jpg`);
      await uploadBytes(imgRef, blob);
      imageUrl = await getDownloadURL(imgRef);
    }

    await addDoc(collection(db, "posts"), {
      text,
      imageUrl,
      user: auth.currentUser.email,
      likes: 0,
      createdAt: serverTimestamp()
    });

    navigation.goBack();
  };

  return (
    <View>
      <TextInput placeholder="What's on your mind?" onChangeText={setText} />
      <Button title="Pick Image" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <Button title="Post" onPress={post} />
    </View>
  );
}
