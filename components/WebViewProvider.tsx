import {
  createContext,
  MutableRefObject,
  PropsWithChildren,
  useRef,
  useState,
} from 'react';
import WebView from 'react-native-webview';
interface WebViewContextType {
  webViewRefs: MutableRefObject<WebView[]>;
  addWebView: (webView: WebView) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export const WebViewContext = createContext<WebViewContextType | undefined>(
  undefined,
);

export default function WebViewProvider({ children }: PropsWithChildren) {
  const webViewRefs = useRef<WebView[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const addWebView = (webView: WebView) => {
    webViewRefs.current.push(webView);
  };
  return (
    <WebViewContext.Provider
      value={{ webViewRefs, addWebView, isLoggedIn, setIsLoggedIn }}>
      {children}
    </WebViewContext.Provider>
  );
}
