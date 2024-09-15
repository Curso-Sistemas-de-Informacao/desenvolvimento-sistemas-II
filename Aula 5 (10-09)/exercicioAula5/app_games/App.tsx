import { StyleSheet, Text, View, Image, TextInput, FlatList } from "react-native";
import { useState } from "react";
import Game from "./src/data/games";

export default function App() {
  const [jogos, setJogos] = useState(Game);
  const [filtro, setFiltro] = useState()

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>App Games</Text>
        <TextInput value="" />
      </View>
      <View style={styles.content}>
          <FlatList
          data={jogos}
          renderItem={({ item }) => (
            <View style={styles.gameItem}>
              <Image source={{ uri: item.image}} style={styles.img} />
              <Text>Nome: {item.name}</Text>
              <Text>Plataforma: {item.platform}</Text>
              <Text>Gênero: {item.genre}</Text>
              <Text>Data de lançamento: {item.releaseDate}</Text>
              <Text>Classificação: {item.rating}</Text>
              <Text>Desenvolvedora: {item.developer}</Text>
              <Text>{item.ratingScore}</Text>
            </View>
          )}
          keyExtractor={item => item.id.toString()}
          />
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
    flexDirection: "column",
  },
  header: {
    height: 100,
    paddingTop: "5%",
    backgroundColor: "#e6e1e1",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 2,
    backgroundColor: "#ffffff",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    width: 150,
    height: 100,
  },
  gameItem: {
    backgroundColor: "#fff",
    padding: 5,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 2,
  },

  footer: {
    height: 60,
    paddingTop: "4%",
    backgroundColor: "#e6e1e1",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
