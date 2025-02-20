import { useCallback, useContext } from 'react';
import { WebViewMessageEvent } from 'react-native-webview';
import { WebViewContext } from '../components/WebViewProvider';

export default function useLogin() {
  const context = useContext(WebViewContext);
  const loadLoggedIn = useCallback(() => {
    context?.webViewRefs.current.forEach(webView => {
      webView.injectJavaScript(`
        (function() {
          window.ReactNativeWebView.postMessage(document.cookie);
        })();
      `);
    });
  }, [context]);

  const logout = useCallback(() => {
    context?.webViewRefs.current.forEach(webView => {
      webView.injectJavaScript(`
        (function() {
          document.cookie = 'NID_SES=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.naver.com';
          window.ReactNativeWebView.postMessage(document.cookie);
        })();
      `);
    });
    context?.setIsLoggedIn(false);
    if (context?.webViewRefs !== null) {
      context?.webViewRefs.current.forEach(webView => {
        webView.reload();
      });
    }
  }, [context]);

  const onMessage = useCallback(
    (e: WebViewMessageEvent) => {
      const cookieString = e.nativeEvent.data;
      context?.setIsLoggedIn(cookieString.includes('NID_SES'));
    },
    [context],
  );
  return { loadLoggedIn, onMessage, isLoggedIn: context?.isLoggedIn, logout };
}
