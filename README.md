# Web2do

> Demo for React native + Web view

## Embed web content with `WebView` component

```ts
// app/(tabs)/index.jsx
import { WebView } from 'react-native-webview';

export default function HomeScreen() {
  return <WebView source={{ uri: "https://blog.logrocket.com/" }} />;
}
```

## Embed inline HTML

```ts
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
```

## Communicating between JavaScript and React Native

```ts
# app/(tabs)/index.jsx
import { WebView } from "react-native-webview";

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

  const runFirst = `
      setTimeout(function() {
          window.alert("Click me!");
          document.getElementById("h1_element").innerHTML =
          "What is your favourite language?";
          document.getElementById("h2_element").innerHTML =
          "We will see!";
        }, 1000);
      true; // note: this is required, or you'll sometimes get silent failures
    `;

  const runBeforeFirst = `
      window.isNativeApp = true;
      true; // note: this is required, or you'll sometimes get silent failures
  `;

  return (
    <WebView
      source={{ html: customHTML }}
      onMessage={(event) => {}}
      injectedJavaScript={runFirst}
      injectedJavaScriptBeforeContentLoaded={runBeforeFirst}
    />
  );
}
```

- `injectedJavaScript`: executes once after the resource loads for the first time.
  - Even if refresh the site, the code will not be executed again.
- `injectedJavaScriptBeforeContentLoaded`: executes before the page is loaded for the first time.
  - `runBeforeFirst`: this is required, or you'll sometimes get silent failures

## The injectJavaScript method in React Native WebView

- `onLoad`: executes js after the WebView has fully loaded

```ts
const onLoadHandler = ({ nativeEvent }: WebViewNavigationEvent) => {
  if (!nativeEvent.url.startsWith("http")) {
    webRef?.current?.injectJavaScript(injectedJavaScript);
  }
};
```

- Redirect to web url

```ts
window.location = "https://blog.logrocket.com";
```

- `onMessage`: receives messages from the web view. (mandatory)

```ts
onMessage={(event) => { console.log(event.nativeEvent.data); }}
```

- `window.ReactNativeWebView.postMessage` sends messages to React Native.

```ts
window.ReactNativeWebView.postMessage("counter: ${counter}");
```

## Handling navigation and URL changes in React Native WebView

```ts
<WebView
  source={{ uri: 'https://blog.logrocket.com/' }}
  onNavigationStateChange={(navState) => {
    console.log(navState)
    // {
    //   url: string;
    //   loading: boolean;
    //   title: string;
    //   canGoBack: boolean;
    //   canGoForward: boolean;
    // }
  }}
  onShouldStartLoadWithRequest={(request) => {
    return request.url.startsWith('https://blog.logrocket.com/');
  }}
/>
```

- `onNavigationStateChange`: is invoked whenever the `WebView` loading starts and ends

- `onShouldStartLoadWithRequest`: restricts navigation

## WebView customization techniques in React Native

- Custom style -> does not work.

```ts
const injectedJavaScript = `
    const style = document.createElement('style');
    style.innerHTML = 'body { background-color: grey; }';
    document.head.appendChild(style);
    true;
  `;

  return (
    <WebView
      source={{ uri: "https://blog.logrocket.com/" }}
      injectedJavaScript={injectedJavaScript}
    />
  );
```

- handle loading -> does not work

```ts
export default function HomeScreen() = () => {
  const [error, setError] = useState(null);

  return (
    <>
      {error ? (
        <Error errorMessage={error.message} />
      ) : (
        <WebView
          source={{ uri: "https://blog.logrocket.com/" }}
          onError={(error) => setError(error)}
          startInLoadingState={true}
          renderLoading={() => <ActivityIndicator size="large" />}
        />
      )}
    </>
  );
};
```

## SafeArea 처리하기

### 1. SafeAreaView

```ts
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

export default function MyWebView() {
  return (
    <SafeAreaView style={styles.container}>
      <WebView source={{ uri: 'https://example.com' }} style={styles.webview} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  webview: {
    flex: 1
  }
});
```

- RN 의 style 은 oklch 를 지원하지 않음
- notch 를 동일한 색상으로 채워도 최상단에서 위로 스크롤 했을 때 깨져보임

### 2. viewport 방식

- RN 에서는 SAfeAreaView 를 제거
- web 에서 viewport 설정

```ts
// layout.tsx
..
<html lang="en">
    <head>
        <meta
            name="viewport"
            content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
    </head>
    <body>
    ..
```

```css
/* glocal.css*/
body {
  background-color: #f97316;
  font-family: Arial, Helvetica, sans-serif;
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}
```

- 결국은 background-color 별도로 해주어야 한다
- 스크롤 해도 일관되게 보임
  - 그래도 최상단 최하단의 스크롤을 막기는 해야할 듯
