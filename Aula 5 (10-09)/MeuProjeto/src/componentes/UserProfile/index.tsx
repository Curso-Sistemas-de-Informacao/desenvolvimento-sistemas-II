import React from "react";
import { Image, Text, View } from "react-native";

function UserProfile(props: any) {
  const { name, imageUrl } = props;

  return (
    <View>
      <Image source={{ uri: imageUrl }} style={{ width: 100, height: 100 }} />
      <Text>{name}</Text>
    </View>
  );
}

export default UserProfile;