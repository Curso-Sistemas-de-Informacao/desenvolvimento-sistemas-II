import { StyleSheet, Text, View, Image, TextInput, FlatList, Modal, TouchableOpacity } from "react-native";
import { useState } from "react";
import Game from "./src/data/games";
import YoutubePlayer from "react-native-youtube-iframe";

export default function App() {
  const [jogos, setJogos] = useState(Game);
  const [filtro, setFiltro] = useState("")
  const [modalVisivel, setModalVisivel] = useState(false)
  const [jogoSelecionado, setJogoSelecionado] = useState<any>(null);

  
  const jogosFiltrados = filtro === "" ? jogos : jogos.filter(jogo =>
    jogo.name.toLowerCase().includes(filtro.toLowerCase())
  ).sort((a, b) => a.name.localeCompare(b.name));

  return (

    <View style={styles.container}>
        <Modal 
        visible={modalVisivel}
        onRequestClose={() => setModalVisivel(false)}
        transparent={true}
        animationType="slide"
        >
        <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {jogoSelecionado && (
            <View>
              <Text style={styles.modalTitle}>{jogoSelecionado.name}</Text>
              <YoutubePlayer
                  height={300} // Aumentar a altura para um tamanho maior
                  width={300} // Aumentar a largura para ocupar a tela de maneira adequada
                  play={false}
                  videoId={jogoSelecionado.trailer.split("v=")[1].substring(0, 11)}
                />
              <TouchableOpacity onPress={() => setModalVisivel(false)} >
                <Text style={styles.closeButton}>Fechar</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        </View>
      </Modal>


      <View style={styles.header}>
        <Text>App Games</Text>
        <TextInput value={filtro} onChangeText={text => setFiltro(text)} placeholder="Digite o nome de algum jogo"/>
      </View>
      <View style={styles.content}>
        <FlatList
          data={jogosFiltrados}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.gameItem} 
              onPress={() => {
                setJogoSelecionado(item); 
                setModalVisivel(true);    
              }}
            >
              <Image source={{ uri: item.image }} style={styles.img} />
              <Text>Nome: {item.name}</Text>
              <Text>Plataforma: {item.platform}</Text>
              <Text>Gênero: {item.genre}</Text>
              <Text>Data de lançamento: {item.releaseDate}</Text>
              <Text>Classificação: {item.rating}</Text>
              <Text>Desenvolvedora: {item.developer}</Text>
              <Text>{item.ratingScore}</Text>
            </TouchableOpacity>
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
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  modalContent: {
    width: 300, 
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  closeButton: {
    color: "blue",
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
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
