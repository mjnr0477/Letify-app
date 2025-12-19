import React from "react";
import { Card, Button, Text } from "react-native-paper";
import { Image } from "react-native";
import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "../firebase";

export default function PostCard({ post }) {
  const like = async () => {
    await updateDoc(doc(db, "posts", post.id), {
      likes: increment(1)
    });
  };

  return (
    <Card style={{ margin:10 }}>
      <Card.Title title={post.user} />
      <Card.Content>
        <Text>{post.text}</Text>
        {post.imageUrl && (
          <Image source={{ uri: post.imageUrl }} style={{ height:250, marginTop:10 }} />
        )}
        <Text style={{ marginTop:10 }}>❤️ {post.likes || 0}</Text>
      </Card.Content>
      <Card.Actions>
        <Button onPress={like}>Like</Button>
      </Card.Actions>
    </Card>
  );
}
