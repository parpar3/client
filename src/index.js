import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { UseWalletProvider } from "use-wallet";
import { PersistGate } from 'redux-persist/integration/react'
import * as serviceWorker from './serviceWorker';
import {configStore, persistor} from './store'
import App from './App';
import {CHAINMAINID} from "./helper/ABI"

ReactDOM.render(
  <React.StrictMode>
    <Provider store={configStore}>
      <PersistGate loading={null} persistor={persistor}>
        <UseWalletProvider    
          chainId={CHAINMAINID}
          connectors={{ 
            portis: { dAppId: 'my-dapp-id-123-xyz' }, 
            walletconnect: { rpcUrl: 'https://bsc-dataseed.binance.org/' },
          }}
          // connectors={{
          //   injected: {
          //     //allows you to connect and switch between mainnet and rinkeby within Metamask.
          //     chainId: [56, 97],
          //     // chainId: [1, 4, 56, 97],
          //   },
          //   portis: {
          //     //allows you to connect and switch between mainnet and rinkeby within Metamask.
          //     chainId: [56, 97],
          //     dAppId: 'my-dapp-id-123-xyz'
          //   },
          //   walletconnect: {
          //     chainId: [56],
          //     // rpcUrl: 'https://mainnet.eth.aragon.network/',
          //     rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545',
          //   },
          // }}
        >
          <App />
        </UseWalletProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();

