import { WebView } from "react-native-webview";

export default function HomeScreen() {
  return <WebView source={{ uri: "http://localhost:3000" }} />;
}
