import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import { Provider } from "react-redux";
import axios from "axios";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store";

axios.defaults.baseURL =
  // "https://esystems.cdl.lk/backend-Test/OnlineRecruitment/";
  // "http://172.30.30.54/";
  "http://localhost:61184/";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <GoogleOAuthProvider clientId="540223147082-ngmpjc79bn28u93mdbmi156j987kf5ks.apps.googleusercontent.com">
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <App />
      </PersistGate>
    </Provider>
  </GoogleOAuthProvider>
);
