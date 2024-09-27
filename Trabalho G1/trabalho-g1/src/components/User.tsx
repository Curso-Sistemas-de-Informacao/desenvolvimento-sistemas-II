import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import axios from "axios";

type RootStackParamList = {
  Home: undefined;
  UserDetails: { userId: number };
  EditUser: { userId: number };
};

type UserCardNavigationProp = StackNavigationProp<
  RootStackParamList,
  "UserDetails",
  "EditUser"
>;

type UserCardProps = {
  id: number;
  name: string;
  email: string;
};

function deletarUser(id: number) {
  axios.delete(`http://192.168.40.45:3000/users/${id}`);
}

const UserCard: React.FC<UserCardProps> = ({id, name, email }) => {
  const navigation = useNavigation<UserCardNavigationProp>();

  return (
    <TouchableOpacity
    onPress={() => navigation.navigate("UserDetails", { userId: id })}
  >
    <View style={styles.card}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.email}>{email}</Text>
      <TouchableOpacity style={styles.botaoRemover} onPress={() => deletarUser(id)}>
          <Text style={styles.botaoTexto}>Remover User</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.botaoEditar} onPress={() => navigation.navigate("EditUser", { userId: id })}>
          <Text style={styles.botaoTexto}>Editar User</Text>
      </TouchableOpacity>
    </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f3f3f3",
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    paddingBottom: 30
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  email: {
    fontSize: 14,
    color: "#555",
  },
  botaoRemover: {
    alignSelf: "flex-end",
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  botaoEditar: {
    alignSelf: "flex-end",
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginTop: 10
  },

  botaoTexto: {
    color: "#fff",
  }
});

export default UserCard;