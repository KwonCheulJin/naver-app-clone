import { router } from 'expo-router';
import { useCallback, useContext, useRef, useState } from 'react';
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import WebView from 'react-native-webview';
import { ShouldStartLoadRequest } from 'react-native-webview/lib/WebViewTypes';
import { WebViewContext } from '../../components/WebViewProvider';

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
  },
});

const SHOPPING_HOME_URL = 'https://shopping.naver.com/home';

export default function ShoppingScreen() {
  const context = useContext(WebViewContext);
  const webViewRef = useRef<WebView | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const handleOnShouldStartLoadWithRequest = (req: ShouldStartLoadRequest) => {
    console.log('home - request', req);
    if (
      req.url.startsWith(SHOPPING_HOME_URL) ||
      req.mainDocumentURL?.startsWith(SHOPPING_HOME_URL)
    ) {
      return true;
    }

    if (req.url !== null && req.url.startsWith('https://')) {
      router.navigate({ pathname: 'browser', params: { initialUrl: req.url } });
      return false;
    }
    return true;
  };
  const onRefresh = useCallback(() => {
    if (webViewRef.current !== null) {
      setRefreshing(true);
      webViewRef.current.reload();
    }
  }, []);
  return (
    <SafeAreaView style={styles.safearea}>
      <ScrollView
        contentContainerStyle={{ flex: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <WebView
          ref={ref => {
            webViewRef.current = ref;
            if (ref !== null) {
              context?.addWebView(ref);
            }
          }}
          source={{ uri: SHOPPING_HOME_URL }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          onShouldStartLoadWithRequest={handleOnShouldStartLoadWithRequest}
          onLoad={() => {
            setRefreshing(false);
          }}
          renderLoading={() => <></>}
          startInLoadingState={true}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
