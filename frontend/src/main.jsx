/* eslint-disable no-unused-vars */
import { StrictMode, createContext, useContext } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import Sidebar from './components/Sidebar.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import rootReducer from "./reducers/combineReducer";
import { configureStore } from "@reduxjs/toolkit";
import { Toaster } from "react-hot-toast";
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');
const SocketContext = createContext(null);

const useSocket = () => useContext(SocketContext);

const store = configureStore({
  reducer: rootReducer,
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <SocketContext.Provider value={socket}>
        <BrowserRouter>
          <App />
          <Toaster />
        </BrowserRouter>
      </SocketContext.Provider>
    </Provider>
  </StrictMode>
);

export { SocketContext, useSocket };