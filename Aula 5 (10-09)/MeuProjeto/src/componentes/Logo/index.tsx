import { Image } from "react-native";

function Logo(props: any) {
  const { imageUrl } = props;

  return (
    <Image source={{ uri: imageUrl }} style={{ width: 250, height: 250 }} />
  );
}

export default Logo;