import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export default function AuthLoadingScreen({ navigation }) {
  useEffect(() => {
    onAuthStateChanged(auth, user => {
      navigation.replace(user ? "Main" : "Login");
    });
  }, []);

  return (
    <View style={{ flex:1, justifyContent:"center" }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
