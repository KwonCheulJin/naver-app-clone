import { router } from 'expo-router';
import { Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import { ShouldStartLoadRequest } from 'react-native-webview/lib/WebViewTypes';

const styles = StyleSheet.create({
  safearea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,
  },
});
export default function HomeScreen() {
  const handleOnShouldStartLoadWithRequest = (req: ShouldStartLoadRequest) => {
    console.log('home - request', req);
    if (
      req.url.startsWith('https://m.naver.com') ||
      req.mainDocumentURL?.startsWith('https://m.naver.com')
    ) {
      return true;
    }

    if (req.url !== null && req.url.startsWith('https://')) {
      router.navigate({ pathname: 'browser', params: { initialUrl: req.url } });
      return false;
    }
    return true;
  };
  return (
    <SafeAreaView style={styles.safearea}>
      <WebView
        source={{ uri: 'https://m.naver.com' }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        onShouldStartLoadWithRequest={handleOnShouldStartLoadWithRequest}
      />
    </SafeAreaView>
  );
}
