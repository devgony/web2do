import { StyleSheet } from "react-native";
import WebView from "react-native-webview";

export default function HomeScreen() {
  return <WebView source={{ uri: "https://blog.logrocket.com/" }} />;
}
