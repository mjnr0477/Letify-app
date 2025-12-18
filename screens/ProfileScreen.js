import React, { useState, useEffect } from "react";
import { View, TextInput, Button, Text, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "../firebase";

export default function ProfileScreen() {
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState(null);
  const uid = auth.currentUser.uid;

  useEffect(() => {
    getDoc(doc(db, "users", uid)).then(snap => {
      if (snap.exists()) setBio(snap.data().bio || "");
    });
  }, []);

  const pickImage = async () => {
    const r = await ImagePicker.launchImageLibraryAsync({ quality: 0.7 });
    if (!r.canceled) setAvatar(r.assets[0].uri);
  };

  const saveProfile = async () => {
    let photoURL = "";
    if (avatar) {
      const blob = await (await fetch(avatar)).blob();
      const refImg = ref(storage, `avatars/${uid}.jpg`);
      await uploadBytes(refImg, blob);
      photoURL = await getDownloadURL(refImg);
    }
    await setDoc(doc(db, "users", uid), {
      bio,
      photoURL,
      email: auth.currentUser.email
    });
  };

  return (
    <View>
      <Text>Profile</Text>
      <TextInput placeholder="Bio" value={bio} onChangeText={setBio} />
      <Button title="Pick Avatar" onPress={pickImage} />
      <Button title="Save" onPress={saveProfile} />
    </View>
  );
}
