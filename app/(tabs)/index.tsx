import { StyleSheet } from "react-native";
import WebView from "react-native-webview";

export default function HomeScreen() {
  const customHTML = `
    <body style="display:flex; flex-direction: column;justify-content: center; 
      align-items:center; background-color: black; color:white; height: 100%;">
        <h1 style="font-size:100px; padding: 50px; text-align: center;" 
        id="h1_element">
          This is simple html
        </h1>
        <h2 style="display: block; font-size:80px; padding: 50px; 
        text-align: center;" id="h2_element">
          This text will be changed later!
        </h2>
     </body>`;

  return <WebView source={{ html: customHTML }} />;
}
