import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { RecoilRoot } from "recoil";

const getLibrary = (provider: any) => new Web3Provider(provider);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <Web3ReactProvider getLibrary={getLibrary}>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </Web3ReactProvider>
  </BrowserRouter>
);
