import "./App.css";
import React, { Component, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { injected, walletconnect, uauth, uauth2 } from "./connectors";
import Navbar from "./components/Navbar"
import Board from "./components/Board"

import ReactTooltip from 'react-tooltip';

function withUseWeb3React(Component) {
  console.log('afeffffffffffffffffffffffffffffffffffffffffffffffffffff')
  console.log(process.env)
  return function WrappedComponent(props) {
    const values = useWeb3React();
    return <Component {...props} web3ReactHook={values} />;
  };
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: false,
      showDomain: false,
      domain: "",
    };

    this.connectMetamask = this.connectMetamask.bind(this);
    this.connectUnstoppable = this.connectUnstoppable.bind(this);
    this.logout = this.logout.bind(this);
    
  }
  

  async connectMetamask() {
    console.log(injected);
    console.log(this.props.web3ReactHook.activate(injected, undefined, true));

    this.props.web3ReactHook
      .activate(injected, null, true)
      .then((res) => {
        injected
          .getAccount()
          .then((account) => {
            console.log(account);
            this.setState({
              isConnected: true,
            });
          })
          .catch((e) => {
            alert(e);
            console.error(e);
          });
      })
      .catch((e) => {
        alert(e);
        console.error(e);
      });
  }

  async connectUnstoppable() {
    injected.deactivate();
    this.props.web3ReactHook
      .activate(uauth, null, true)
      
      .then(async (res) => {
        uauth
          .getAccount()

          .then((account) => {
          })
          .catch((e) => {
            alert(e);
            console.error(e);
          });
      })
      .catch((e) => {
        alert(e);
        console.error(e);
      });
  }

  logout() {
    uauth2.uauth.logout();
    this.props.web3ReactHook.deactivate();
    injected.deactivate();
    uauth.deactivate();
    
    this.setState({
      isConnected: false,
      showDomain: false,
      domain: "",
    });
    
  }


  fetchData(){
    uauth2.uauth.user()
    .then((data) => {
      if (data) {
        if(this.state.isConnected == false){
          this.setState({
            isConnected: true,
            showDomain: true,
            domain: localStorage.getItem("uauth-default-username")
          });
        }
        
      } else {

      }
    })
    .catch((_err) => {});
  }
  

  render() {
    let login = true;
    {this.fetchData()}
    return(
      <>
      <Navbar login={this.connectUnstoppable} isConnected={this.state.isConnected} domain={this.state.domain} logout={this.logout}/>
      <Board domain={this.state.domain} hash={this.props.web3ReactHook.account}/>

      
      </>)
      
  }
}

export default withUseWeb3React(App);
