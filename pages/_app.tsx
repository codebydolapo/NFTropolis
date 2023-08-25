import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { allReducers } from "../components/reducers/reducer";
import { createStore } from "redux";
import { MoralisProvider } from "react-moralis";

const store = createStore(allReducers);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MoralisProvider initializeOnMount={false}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </MoralisProvider>
  );
}

export default MyApp;
