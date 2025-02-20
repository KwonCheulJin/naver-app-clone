import { router } from 'expo-router';
import { useContext } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import { ShouldStartLoadRequest } from 'react-native-webview/lib/WebViewTypes';
import { WebViewContext } from '../../components/WebViewProvider';
import useLogin from '../../hooks/useLogin';

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
  },
});
export default function HomeScreen() {
  const context = useContext(WebViewContext);
  const { loadLoggedIn, onMessage } = useLogin();

  const handleOnShouldStartLoadWithRequest = (req: ShouldStartLoadRequest) => {
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
        ref={ref => {
          if (ref !== null) {
            context?.addWebView(ref);
          }
        }}
        source={{ uri: 'https://m.naver.com' }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        onShouldStartLoadWithRequest={handleOnShouldStartLoadWithRequest}
        onLoad={() => {
          console.log('load');
          loadLoggedIn();
        }}
        onMessage={onMessage}
      />
    </SafeAreaView>
  );
}
