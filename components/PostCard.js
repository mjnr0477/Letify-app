import React from "react";
import { View, Text, Image, Button } from "react-native";
import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "../firebase";

export default function PostCard({ post }) {
  const like = async () => {
    await updateDoc(doc(db, "posts", post.id), {
      likes: increment(1)
    });
  };

  return (
    <View style={{ margin: 10 }}>
      <Text>{post.user}</Text>
      <Text>{post.text}</Text>
      {post.imageUrl && (
        <Image source={{ uri: post.imageUrl }} style={{ width: 250, height: 250 }} />
      )}
      <Text>❤️ {post.likes || 0}</Text>
      <Button title="Like" onPress={like} />
    </View>
  );
}
