import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import axios from "axios";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, RouteProp, useRoute } from "@react-navigation/native";

interface User {
  name: string;
  email: string;
  login: string;
  password: string;
  city: string;
}

type RootStackParamList = {
  Home: undefined;
  EditUser: { userId: string }; 
};

type EditUserNavigationProp = StackNavigationProp<
  RootStackParamList,
  "EditUser"
>;

type EditUserRouteProp = RouteProp<RootStackParamList, "EditUser">;

const EditUser: React.FC = () => {
  const navigation = useNavigation<EditUserNavigationProp>();
  const route = useRoute<EditUserRouteProp>();
  const { userId } = route.params; 
  const [formUser, setFormUser] = useState<User>({
    name: "",
    email: "",
    login: "",
    password: "",
    city: "",
  });


  useEffect(() => {
    const loadUserData = async () => {
        try {
          const response = await axios.get(`http://192.168.40.45:3000/users/${userId}`);
          setFormUser(response.data);
        } catch (error) {
          console.error("Erro ao carregar os dados do usuário:", error);
        }
      };
    loadUserData();
  }, []);

  const handleChange = (name: keyof User, value: string) => {
    setFormUser((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const makePutRequest = async () => {
    try {
      await axios.put(`http://192.168.40.45:3000/users/${userId}`, {
        ...formUser,
      });
      navigation.navigate("Home");
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  return (
    <View>
      <Text style={styles.label}>Nome: </Text>
      <TextInput
        style={styles.input}
        value={formUser.name}
        onChangeText={(value) => handleChange("name", value)}
        placeholder="Digite o nome"
      />

      <Text style={styles.label}>Email: </Text>
      <TextInput
        style={styles.input}
        value={formUser.email}
        onChangeText={(value) => handleChange("email", value)}
        placeholder="Digite o email"
      />

      <Text style={styles.label}>Login: </Text>
      <TextInput
        style={styles.input}
        value={formUser.login}
        onChangeText={(value) => handleChange("login", value)}
        placeholder="Digite o login"
      />

      <Text style={styles.label}>Senha: </Text>
      <TextInput
        style={styles.input}
        value={formUser.password}
        onChangeText={(value) => handleChange("password", value)}
        placeholder="Digite a senha"
      />

      <Text style={styles.label}>Cidade: </Text>
      <TextInput
        style={styles.input}
        value={formUser.city}
        onChangeText={(value) => handleChange("city", value)}
        placeholder="Digite a cidade"
      />

      <TouchableOpacity onPress={makePutRequest} style={styles.botao}>
        <Text style={styles.botaoTexto}>Editar User</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditUser;

const styles = StyleSheet.create({
    label: {
        fontWeight: "bold",
        marginBottom: 5,
        marginTop: 10,
        marginLeft: 5,
    },

    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        marginLeft: 5,
        marginRight: 5,
        backgroundColor: "white"
    },

    botao: {
        backgroundColor: "blue",
        padding: 10,
        borderRadius: 5,
        alignSelf: "center",
        marginTop: 10,
    },

    botaoTexto: {
        color: "white",
    }
});
