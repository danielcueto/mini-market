import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import { App } from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { NotificationProvider } from "./provider/NotificationProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
    <NotificationProvider>
      <Provider store={store}>
        <App/>
      </Provider>
      </NotificationProvider>
    </BrowserRouter>
  </StrictMode>
);
