import React, { useEffect, useState } from "react";
import { View, FlatList, Button, Text } from "react-native";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";

export default function HomeScreen({ navigation }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    return onSnapshot(q, snap => {
      setPosts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Button title="Create Post" onPress={() => navigation.navigate("CreatePost")} />
      <FlatList
        data={posts}
        keyExtractor={i => i.id}
        renderItem={({ item }) => (
          <View style={{ padding: 10 }}>
            <Text>{item.user}</Text>
            <Text>{item.text}</Text>
          </View>
        )}
      />
    </View>
  );
}
