import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import NavBar from "./components/nav-bar";
import { BrainGameContextProvider } from "./context/BrainGameContext";
// import Footer from "./components/footer";
// import Layout from "./components/layout";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrainGameContextProvider>
      <App />
    </BrainGameContextProvider>
  </React.StrictMode>
);
