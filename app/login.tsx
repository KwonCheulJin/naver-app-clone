import { router } from 'expo-router';
import { useContext } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import { WebViewContext } from '../components/WebViewProvider';

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
  },
});

const LOGIN_URL = 'https://nid.naver.com/nidlogin.login';

export default function LoginScreen() {
  const context = useContext(WebViewContext);
  return (
    <SafeAreaView style={styles.safearea}>
      <WebView
        source={{ uri: LOGIN_URL }}
        onNavigationStateChange={e => {
          if (e.url === 'https://m.naver.com/') {
            if (context?.webViewRefs !== null) {
              context?.webViewRefs.current.forEach(webViewRef => {
                webViewRef.reload();
              });
            }
            router.back();
          }
        }}
      />
    </SafeAreaView>
  );
}
