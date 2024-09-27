import React from "react";
import { StyleSheet, View, Text, TouchableOpacity  } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  Home: undefined;
  AddUser: undefined;
};

type AddUserNavigationProp = StackNavigationProp<
  RootStackParamList,
  "AddUser"
>;

const Header: React.FC = () => {
  const navigation = useNavigation<AddUserNavigationProp>();

    return(
        <View style={styles.header}>
            <Text style={styles.headerText}>Header</Text>
            <TouchableOpacity style={styles.botaoAdicionar} onPress={() => navigation.navigate("AddUser")}>
                <Text style={styles.botaoTexto}>Adicionar User</Text>
            </TouchableOpacity>
        </View>
    )

}

export default Header;

const styles = StyleSheet.create({
    header: {
        backgroundColor: "black",
        padding: 20,
        paddingTop: 40,
        alignItems: "center",
      },
    headerText: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
      },
      botaoAdicionar: {
        alignSelf: "flex-end",
        backgroundColor: "green",
        padding: 10,
        borderRadius: 5,
      },
      botaoTexto: {
        color: "#fff",
      }
})