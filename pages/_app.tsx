import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { allReducers } from "../components/reducers/reducer";
import { createStore } from "redux";
import { MoralisProvider } from "react-moralis";
import { WagmiConfig, createConfig, configureChains } from "wagmi";
import { polygonMumbai, mainnet, polygon, sepolia, localhost, hardhat } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";
require("dotenv").config;
import { InjectedConnector } from "wagmi/connectors/injected";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { CreateConfigParameters, WebSocketPublicClient } from "wagmi";
import { providers } from "ethers";
import { WalletConnectConnector } from "wagmi/dist/connectors/walletConnect";
import { useEffect } from "react";

const store = createStore(allReducers);

const { publicClient, webSocketPublicClient, chains } = configureChains(
  [mainnet, polygonMumbai, localhost, hardhat],
  [
    alchemyProvider({
      apiKey: process.env.ALCHEMY_API_KEY ?? "",
    }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "nftropolis",
  projectId: process.env.WALLET_CONNECT_PROJECT_ID ?? "",
  chains,
});

const config = createConfig({
  autoConnect: true,
  // connectors: [new InjectedConnector({ chains })],
  connectors,
  publicClient,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // <MoralisProvider initializeOnMount={false}>
      <Provider store={store}>
        <WagmiConfig config={config}>
          <RainbowKitProvider chains={chains}>
            <Component {...pageProps} />
          </RainbowKitProvider>
        </WagmiConfig>
      </Provider>
    // </MoralisProvider>
  );
}

export default MyApp;
