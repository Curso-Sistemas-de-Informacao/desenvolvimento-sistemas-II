import { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import Logo from "./src/componentes/Logo";

export default function App() {
  const [name, setName] = useState("Prof. Felipe Becker Nunes");
  const [idade, setIdade] = useState(30);
  const imageUrl = "https://faculdadeam.edu.br/favicon.ico";

  function mudarNome(nome: string, idade: number) {
    //alert('fui clicado');
    setName(nome);
    setIdade(idade);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Logo imageUrl={imageUrl} />
        <Text style={styles.title}>Hello World!</Text>
        <Text>Meu primeiro App!</Text>
        <Text>{name}</Text>
        <Text>{idade}</Text>
      </View>
      <View style={styles.content}>
        <Button title="Mudar nome" onPress={() => mudarNome("Felipe", 33)} />
        <Text>Teste</Text>
      </View>
      <View style={styles.footer}>
        <Text>Footer</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6e1e1",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  header: {
    flex: 2,
    paddingTop: 12,
    backgroundColor: "red",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 2,
    backgroundColor: "blue",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    flex: 1,
    backgroundColor: "green",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "red",
  },
});