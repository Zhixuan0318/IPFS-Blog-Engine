import {UAuthConnector} from '@uauth/web3-react'
import {InjectedConnector} from '@web3-react/injected-connector'
import {WalletConnectConnector} from '@web3-react/walletconnect-connector'
import UAuth from '@uauth/js'
// Instanciate your other connectors.
export const injected = new InjectedConnector({supportedChainIds: [1,137]})

export const walletconnect = new WalletConnectConnector({
  infuraId: process.env.REACT_APP_INFURA_ID,
  qrcode: true,
})

export const uauth2 = new UAuthConnector({ uauth: new UAuth({
  clientID: process.env.REACT_APP_CLIENT_ID,
  clientSecret: process.env.REACT_APP_CLIENT_SECRET,
  redirectUri: process.env.REACT_APP_REDIRECT_URI,
  postLogoutRedirectUri: process.env.REACT_APP_POST_LOGOUT_REDIRECT_URI,
  fallbackIssuer: process.env.REACT_APP_FALLBACK_ISSUER,
  scope: 'openid wallet',
  connectors: {injected, walletconnect},
  }),
})

export const uauth = new UAuthConnector({

  clientID: process.env.REACT_APP_CLIENT_ID,
  clientSecret: process.env.REACT_APP_CLIENT_SECRET,
  redirectUri: process.env.REACT_APP_REDIRECT_URI,
  postLogoutRedirectUri: process.env.REACT_APP_POST_LOGOUT_REDIRECT_URI,
  fallbackIssuer: process.env.REACT_APP_FALLBACK_ISSUER,
  scope: 'openid wallet',
  connectors: {injected, walletconnect},

})

var connectors = {
    injected: injected,
    walletconnect: walletconnect,
    uauth: uauth,
};


export default connectors