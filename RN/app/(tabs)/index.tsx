import { SafeAreaView, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{ uri: "http://localhost:3000" }}
        style={styles.webview}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ff6900",
    // backgroundColor: "oklch(70.5% 0.213 47.604)",
  },
  webview: {
    flex: 1,
  },
});
